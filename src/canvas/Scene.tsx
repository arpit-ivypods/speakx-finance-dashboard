import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import Background from './Background';
import GridFloor from './GridFloor';
import ParticleField from './ParticleField';
import { useTheme } from '../theme/ThemeContext';

function Scene() {
  const { isDark } = useTheme();

  const bloomIntensity = isDark ? 0.4 : 0.15;
  const vignetteDarkness = isDark ? 0.6 : 0.2;

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 10, 10]} intensity={0.5} color="#00FFCC" />

      <Background />
      <GridFloor />
      <ParticleField />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={bloomIntensity}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          mipmapBlur
          radius={0.8}
        />
        <Vignette offset={0.2} darkness={vignetteDarkness} />
      </EffectComposer>
    </>
  );
}

export default Scene;
