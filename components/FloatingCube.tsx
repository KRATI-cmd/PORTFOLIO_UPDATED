"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

interface FloatingCubeProps {
  accent?: "sky" | "cyan" | "teal";
}

function AnimatedCube({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const time = clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.5;

    // Scale slightly on hover
    const targetScale = hovered ? 1.1 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  return (
    <RoundedBox
      ref={meshRef}
      args={[2, 2, 2]}
      radius={0.1}
      smoothness={4}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.6}
      />
    </RoundedBox>
  );
}

export default function FloatingCube({ accent = "sky" }: FloatingCubeProps) {
  const colorMap = {
    sky: "#38bdf8",
    cyan: "#22d3ee",
    teal: "#2dd4bf",
  };

  return (
    <div className="h-[300px] w-full pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color={colorMap[accent]} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        <AnimatedCube color={colorMap[accent]} />
      </Canvas>
    </div>
  );
}
