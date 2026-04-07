import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Perspective grid floor -- the "cyber floor" effect.
 *
 * - A large PlaneGeometry tilted ~60 deg from the camera, positioned below.
 * - Grid lines rendered purely in the fragment shader via `fract()`.
 * - Lines fade out with distance from the camera for a natural falloff.
 * - The grid scrolls slowly along Z for a sense of forward motion.
 * - Line colour: rgba(0, 255, 204, 0.06) -- extremely subtle.
 */

const vertexShader = /* glsl */ `
  varying vec3 vWorldPos;
  varying float vDistFromCamera;
  uniform vec3 uCameraPos;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    vDistFromCamera = distance(worldPos.xyz, uCameraPos);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uLineColor;
  uniform float uLineAlpha;
  varying vec3 vWorldPos;
  varying float vDistFromCamera;

  void main() {
    // Scroll the grid along the Z axis
    float scrollSpeed = 0.3;
    float z = vWorldPos.z + uTime * scrollSpeed;
    float x = vWorldPos.x;

    // Grid cell size
    float cellSize = 2.0;
    // Fractional coordinates for grid lines
    vec2 grid = abs(fract(vec2(x, z) / cellSize - 0.5) - 0.5) / fwidth(vec2(x, z) / cellSize);
    float line = min(grid.x, grid.y);
    // Thinner, cleaner lines
    float lineMask = 1.0 - min(line, 1.0);

    // Fade with distance from camera -- start fading at 10, fully gone at 80
    float distFade = 1.0 - smoothstep(10.0, 80.0, vDistFromCamera);

    float alpha = lineMask * uLineAlpha * distFade;

    // Discard fully transparent fragments to avoid blending artifacts
    if (alpha < 0.001) discard;

    gl_FragColor = vec4(uLineColor, alpha);
  }
`;

const LINE_COLOR = new THREE.Color(0, 1, 0.8); // #00FFCC

function GridFloor() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uLineColor: { value: LINE_COLOR },
      uLineAlpha: { value: 0.06 },
      uCameraPos: { value: new THREE.Vector3() },
    }),
    [],
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      materialRef.current.uniforms.uCameraPos.value.copy(state.camera.position);
    }
  });

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]} // lay flat (XZ plane)
      position={[0, -4, 0]}           // below the camera
      frustumCulled={false}
    >
      {/* Large plane so the grid extends far enough */}
      <planeGeometry args={[200, 200, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export default GridFloor;
