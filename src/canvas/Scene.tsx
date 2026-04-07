import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import Background from './Background';
import GridFloor from './GridFloor';
import ParticleField from './ParticleField';

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 10, 10]} intensity={0.5} color="#00FFCC" />

      <Background />
      <GridFloor />
      <ParticleField />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.4}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          mipmapBlur
          radius={0.8}
        />
        <Vignette offset={0.2} darkness={0.6} />
      </EffectComposer>
    </>
  );
}

export default Scene;
