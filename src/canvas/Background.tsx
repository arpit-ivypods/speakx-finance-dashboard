import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../theme/ThemeContext';

/**
 * Fullscreen quad with a deep-space gradient shader.
 *
 * - Vertical linear gradient from top (#0A101E) to bottom (#050B14)
 * - Radial vignette darkening edges
 * - Subtle time-driven hue rotation (+/-2 % over a 60 s cycle)
 *
 * Renders on a plane that covers NDC -1..1 with `depthWrite` / `depthTest`
 * disabled so it always sits behind everything else.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Full-screen quad: position is already -1..1 in clip space
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorTop;
  uniform vec3 uColorBottom;
  uniform float uVignetteStrength;
  varying vec2 vUv;

  // Attempt a tiny hue rotation by rotating the color in a pseudo-HSL manner.
  // We convert RGB -> shift hue -> RGB. Keeps the shader simple.
  vec3 hueShift(vec3 color, float shift) {
    // Rodrigues rotation around the (1,1,1)/sqrt(3) axis in RGB space
    float cosA = cos(shift);
    float sinA = sin(shift);
    vec3 k = vec3(0.57735); // 1/sqrt(3)
    return color * cosA + cross(k, color) * sinA + k * dot(k, color) * (1.0 - cosA);
  }

  void main() {
    // --- vertical gradient ---
    float gradient = vUv.y;
    vec3 baseColor = mix(uColorBottom, uColorTop, gradient);

    // --- radial vignette (controlled by uniform) ---
    vec2 center = vUv - 0.5;
    float dist = length(center);
    float vignette = 1.0 - smoothstep(0.25, 0.85, dist) * uVignetteStrength;
    baseColor *= vignette;

    // --- time-driven hue shift (+/- 2 % -> ~ +/- 0.04 rad) ---
    float hueOffset = sin(uTime / 60.0 * 6.2831853) * 0.04 * uVignetteStrength;
    baseColor = hueShift(baseColor, hueOffset);

    gl_FragColor = vec4(baseColor, 1.0);
  }
`;

const TOP_COLOR = new THREE.Color('#0A101E');
const BOTTOM_COLOR = new THREE.Color('#050B14');

function Background() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    if (!materialRef.current) return;
    const topColor = isDark ? '#0A101E' : '#FFFFFF';
    const bottomColor = isDark ? '#050B14' : '#F8F9FC';
    materialRef.current.uniforms.uColorTop.value.set(topColor);
    materialRef.current.uniforms.uColorBottom.value.set(bottomColor);
    materialRef.current.uniforms.uVignetteStrength.value = isDark ? 1.0 : 0.0;
  }, [isDark]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorTop: { value: TOP_COLOR },
      uColorBottom: { value: BOTTOM_COLOR },
      uVignetteStrength: { value: 1.0 },
    }),
    [],
  );

  useFrame((_state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh frustumCulled={false} renderOrder={-1000}>
      {/* 2x2 plane in clip space – vertex shader bypasses projection */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
        transparent={false}
      />
    </mesh>
  );
}

export default Background;
