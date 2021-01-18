import React, { useRef } from "react";
import './App.scss';

import { Canvas, useFrame } from "react-three-fiber";

const SpinningCube = ({ position }) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01)
  )
  return (
    <mesh position={position} ref={mesh}>
      <boxBufferGeometry attach='geometry' args={1, 1, 1} />
      <meshStandardMaterial attach='material' color='green' />
    </mesh>
  );
};

function App() {
  return (
    <>
      <Canvas colorManagement camera={{ position: [-5, 2, 10], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <SpinningCube position={[0, 1, 0]} />
        <SpinningCube position={[-2, 1, -5]} />
        <SpinningCube position={[5, 1, -2]} />
      </Canvas>
    </>
  );
}

export default App;
