import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../theme/ThemeContext';

/**
 * Ambient floating particles.
 *
 * - 200 points with additive blending for a soft glow.
 * - Colour: #00FFCC at 15-30 % opacity (randomised per-particle).
 * - Motion: slow upward drift + sine-wave wobble on X.
 * - When a particle exits the top, it resets to the bottom with a new random X.
 * - Each particle is a small circle (radius ~0.5-2 px equiv) via PointsMaterial
 *   with a soft-circle sprite texture generated in JS.
 */

const PARTICLE_COUNT = 200;
const FIELD_WIDTH = 30;   // X spread
const FIELD_HEIGHT = 25;  // Y spread
const FIELD_DEPTH = 20;   // Z spread
const Y_MIN = -FIELD_HEIGHT / 2;
const Y_MAX = FIELD_HEIGHT / 2;
const DRIFT_SPEED = 0.4;  // units / second base upward speed

/** Generate a small soft-circle texture for additive glow. */
function createGlowTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const half = size / 2;

  const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.3, 'rgba(255,255,255,0.6)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/** Seeded-random helpers */
function rand(low: number, high: number) {
  return Math.random() * (high - low) + low;
}

interface ParticleData {
  /** per-particle random speed multiplier */
  speed: number;
  /** sine wobble frequency */
  wobbleFreq: number;
  /** sine wobble amplitude */
  wobbleAmp: number;
  /** phase offset so particles aren't in sync */
  phase: number;
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    if (!materialRef.current) return;
    if (isDark) {
      materialRef.current.uniforms.uColor.value.set('#00FFCC');
      materialRef.current.blending = THREE.AdditiveBlending;
    } else {
      materialRef.current.uniforms.uColor.value.set('#7C8BA1');
      materialRef.current.blending = THREE.NormalBlending;
    }
    materialRef.current.needsUpdate = true;
  }, [isDark]);

  const { positions, opacities, sizes, particleData } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const opac = new Float32Array(PARTICLE_COUNT);
    const sz = new Float32Array(PARTICLE_COUNT);
    const data: ParticleData[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = rand(-FIELD_WIDTH / 2, FIELD_WIDTH / 2);
      pos[i3 + 1] = rand(Y_MIN, Y_MAX);
      pos[i3 + 2] = rand(-FIELD_DEPTH / 2, FIELD_DEPTH / 2);

      // 15-30 % opacity
      opac[i] = rand(0.15, 0.30);

      // Size 1-4 (maps roughly to 0.5-2 px on screen at typical distance)
      sz[i] = rand(1, 4);

      data.push({
        speed: rand(0.6, 1.4),
        wobbleFreq: rand(0.3, 1.2),
        wobbleAmp: rand(0.3, 1.5),
        phase: rand(0, Math.PI * 2),
      });
    }

    return { positions: pos, opacities: opac, sizes: sz, particleData: data };
  }, []);

  const glowTexture = useMemo(() => createGlowTexture(), []);

  // Store the original X positions so wobble is additive
  const baseX = useMemo(() => {
    const bx = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      bx[i] = positions[i * 3];
    }
    return bx;
  }, [positions]);

  useFrame((_state, delta) => {
    const pts = pointsRef.current;
    if (!pts) return;

    const posAttr = pts.geometry.getAttribute('position') as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;
    const elapsed = _state.clock.elapsedTime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const d = particleData[i];

      // Upward drift
      posArr[i3 + 1] += DRIFT_SPEED * d.speed * delta;

      // Sine wobble on X
      posArr[i3] = baseX[i] + Math.sin(elapsed * d.wobbleFreq + d.phase) * d.wobbleAmp;

      // Reset to bottom when exiting top
      if (posArr[i3 + 1] > Y_MAX) {
        posArr[i3 + 1] = Y_MIN;
        // New random X so it doesn't just loop in the same column
        const newX = rand(-FIELD_WIDTH / 2, FIELD_WIDTH / 2);
        baseX[i] = newX;
        posArr[i3] = newX;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aOpacity"
          args={[opacities, 1]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTexture: { value: glowTexture },
          uColor: { value: new THREE.Color('#00FFCC') },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        }}
        vertexShader={/* glsl */ `
          attribute float aOpacity;
          attribute float aSize;
          uniform float uPixelRatio;
          varying float vOpacity;

          void main() {
            vOpacity = aOpacity;
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            // Size attenuation: particles shrink with distance
            gl_PointSize = aSize * uPixelRatio * (80.0 / -mvPos.z);
            gl_PointSize = clamp(gl_PointSize, 1.0, 16.0);
            gl_Position = projectionMatrix * mvPos;
          }
        `}
        fragmentShader={/* glsl */ `
          uniform sampler2D uTexture;
          uniform vec3 uColor;
          varying float vOpacity;

          void main() {
            vec4 texel = texture2D(uTexture, gl_PointCoord);
            float alpha = texel.a * vOpacity;
            if (alpha < 0.01) discard;
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
      />
    </points>
  );
}

export default ParticleField;
