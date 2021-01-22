import React, { useRef, useState } from "react";
import './App.scss';

import { Canvas, useFrame } from "react-three-fiber";

import { softShadows, MeshWobbleMaterial, OrbitControls } from "drei";

import { useSpring, a } from "react-spring/three"

softShadows();

const SpinningCube = ({ position, args, color, speed }) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  const [expand, setExpand] = useState(false);

  const props = useSpring({
    scale: expand ? [1, 4, 1, 4, 1, 4] : [2, 2, 2]
  });
  return (
    <a.mesh
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      castShadow
      position={position}
      ref={mesh}>
      <boxBufferGeometry attach='geometry' args={args} />
      <MeshWobbleMaterial
        attach='material'
        color={color}
        speed={speed}
        factor={0.6} />
    </a.mesh>
  );
};

function App() {
  return (
    <>
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-5, 2, 10], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={0.7}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} itensity={0.5} />
        <pointLight position={[-0, -10, 0]} itensity={1.5} />

        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <shadowMaterial attach='material' opacity={0.3} />
          </mesh>
        </group>
        <SpinningCube position={[0, 1, 0]} args={[3, 2, 1]} color="white" speed={11} />
        <SpinningCube position={[-2, 1, -5]} color="red" speed={20} />
        <SpinningCube position={[5, 1, -2]} color="blue" speed={20} />
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
