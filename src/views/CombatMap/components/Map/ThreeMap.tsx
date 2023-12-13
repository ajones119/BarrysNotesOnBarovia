import * as THREE from "three";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MapControls } from "@react-three/drei";

function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.x += delta));
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

const ThreeMap = () => {
  const texture = new THREE.TextureLoader().load("src/images/ismark-background.jpg");

  return (
    <Canvas>
      <MapControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <mesh position={[0, 0, -1]}>
        <planeGeometry
          args={[100, 100]}
        />
        <meshLambertMaterial args={[{ map: texture }]} />
      </mesh>
      <gridHelper
        rotation={new THREE.Euler(Math.PI / 2)}
        args={[100, 20, "white", "white"]}
      />
    </Canvas>
  );
};

export default ThreeMap;
