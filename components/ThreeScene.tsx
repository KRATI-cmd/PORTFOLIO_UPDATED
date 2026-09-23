"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, PerspectiveCamera, Sphere } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Floating particles background
function Particles() {
  const count = 800;
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color(0x38bdf8), // sky
      new THREE.Color(0x22d3ee), // cyan
      new THREE.Color(0x2dd4bf), // teal
    ];

    for (let i = 0; i < count; i++) {
      // Position particles in a spherical distribution
      const radius = 15 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, [count]);

  useFrame(({ clock, mouse }) => {
    if (!particlesRef.current) return;

    const time = clock.getElapsedTime();
    particlesRef.current.rotation.y = time * 0.03;
    particlesRef.current.rotation.x = time * 0.02;

    // Respond to mouse movement (with null check)
    if (mouse) {
      particlesRef.current.rotation.x += mouse.y * 0.0003;
      particlesRef.current.rotation.y += mouse.x * 0.0003;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

// Animated geometric shapes
function GeometricShapes() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[-4, 2, -2]}>
          <icosahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={1} floatIntensity={0.8}>
        <mesh position={[4, -1, -3]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#22d3ee"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1.2} floatIntensity={1}>
        <mesh position={[0, 3, -4]}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
          <meshStandardMaterial
            color="#2dd4bf"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>
    </>
  );
}

// Rotating ring
function RotatingRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.x = clock.getElapsedTime() * 0.3;
    ringRef.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -5]}>
      <torusGeometry args={[3, 0.05, 16, 100]} />
      <meshStandardMaterial
        color="#38bdf8"
        emissive="#38bdf8"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

// Main scene component
export default function ThreeScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#38bdf8" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#2dd4bf" />

        {/* 3D Elements */}
        <Particles />
        <GeometricShapes />
        <RotatingRing />

        {/* Controls for subtle camera movement */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  );
}
