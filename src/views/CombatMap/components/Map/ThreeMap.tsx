import * as THREE from "three";
import React, { useLayoutEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { MapControls, OrbitControlsChangeEvent } from "@react-three/drei";

// Credit to https://discourse.threejs.org/t/camera-zoom-to-fit-object/936/24 - a threejs legend. Looeee wrote the discover threejs whole website.
const fitCameraToObject = function(
  camera: THREE.PerspectiveCamera,
  controls: OrbitControlsChangeEvent,
  object: THREE.Object3D<THREE.Object3DEventMap>,
) {
  const objectSize = new THREE.Vector3();
  const objectCenter = new THREE.Vector3();
  const boundingBox = new THREE.Box3();

  // get bounding box of object - this will be used to setup controls and camera
  boundingBox.setFromObject(object);

  boundingBox.getCenter(objectCenter);
  boundingBox.getSize(objectSize);

  // get the max side of the bounding box (fits to width OR height as needed )
  const maxSize = Math.max(objectSize.x, objectSize.y, objectSize.z);
  const fitHeightDistance =
    maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
  const fitWidthDistance = fitHeightDistance / camera.aspect;
  const distance = Math.max(fitHeightDistance, fitWidthDistance);

  const direction = controls.target
    .clone()
    .sub(camera.position)
    .normalize()
    .multiplyScalar(distance);

  controls.maxDistance = distance * 10;
  controls.target.copy(objectCenter);

  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();

  camera.position.copy(controls.target).sub(direction);

  controls.update();
};

const textureLoader = new THREE.TextureLoader();

const Grid = () => { };

const Background = () => {
  const { camera, controls } = useThree();
  const meshRef = useRef<THREE.Mesh>(new THREE.Mesh());
  const materialRef = useRef<THREE.MeshLambertMaterial>(
    new THREE.MeshLambertMaterial(),
  );
  textureLoader.load("src/images/ismark-background.jpg", (t) => {
    materialRef.current.map = t;
    materialRef.current.side = THREE.DoubleSide;
    materialRef.current.needsUpdate = true;

    meshRef.current.geometry = new THREE.PlaneGeometry(
      t.image.width as number,
      t.image.height as number,
    );

    fitCameraToObject(
      camera as THREE.PerspectiveCamera,
      controls as OrbitControlsChangeEvent,
      meshRef.current,
    );
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[100, 100]} />
      <meshLambertMaterial ref={materialRef} />
    </mesh>
  );
};

const ThreeMap = () => {
  const gridRef = useRef<THREE.GridHelper>(new THREE.GridHelper());

  return (
    <Canvas>
      <MapControls makeDefault />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Background />
      <lineSegments>
        <planeGeometry args={[100, 100]} />
        <lineBasicMaterial args={[{ color: "white" }]} />
      </lineSegments>
    </Canvas>
  );
};

export default ThreeMap;
