"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

interface SkillOrbProps {
  skills: string[];
  accent: string;
  selectedSkill: string | null;
  onSkillSelect: (skill: string | null) => void;
}

function SkillSphere({ skills, color, selectedSkill, onSkillClick }: { skills: string[]; color: string; selectedSkill: string | null; onSkillClick: (skill: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 2.5;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
  });

  // Distribute skills evenly on sphere surface
  const positions = skills.map((_, index) => {
    const phi = Math.acos(-1 + (2 * index) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;

    return {
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi),
    };
  });

  return (
    <group ref={groupRef}>
      {/* Central wireframe sphere */}
      <mesh>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Skill labels floating around sphere */}
      {skills.map((skill, index) => {
        const isSelected = selectedSkill === skill;
        return (
          <group
            key={skill}
            position={[positions[index].x, positions[index].y, positions[index].z]}
            onClick={() => onSkillClick(skill)}
            style={{ cursor: "pointer" } as any}
          >
            {/* Connection line from center */}
            <mesh>
              <cylinderGeometry args={[0.01, 0.01, radius, 8]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={isSelected ? 0.6 : 0.2}
              />
            </mesh>

            {/* Glowing point */}
            <mesh>
              <sphereGeometry args={[isSelected ? 0.15 : 0.08, 16, 16]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={isSelected ? 0.5 : 0}
                toneMapped={false}
              />
            </mesh>

            {/* Skill text */}
            <Text
              position={[0, 0.4, 0]}
              fontSize={isSelected ? 0.24 : 0.18}
              color={color}
              anchorX="center"
              anchorY="middle"
              outlineWidth={isSelected ? 0.02 : 0.01}
              outlineColor={isSelected ? color : "#000000"}
            >
              {skill}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

export default function SkillOrb({ skills, accent, selectedSkill, onSkillSelect }: SkillOrbProps) {

  const colorMap: Record<string, string> = {
    sky: "#38bdf8",
    cyan: "#22d3ee",
    teal: "#2dd4bf",
  };

  return (
    <div className="relative">
      <div className="h-[400px] w-full">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <SkillSphere
            skills={skills}
            color={colorMap[accent] || colorMap.sky}
            selectedSkill={selectedSkill}
            onSkillClick={(skill) => onSkillSelect(selectedSkill === skill ? null : skill)}
          />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1.5}
          />
        </Canvas>
      </div>

      {/* Popup for selected skill */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => onSkillSelect(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="card p-8 max-w-sm mx-4"
              data-accent={accent}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedSkill}</h3>
                  <p className="mt-2 text-sm text-mist">
                    Click to deselect or click outside to close
                  </p>
                </div>
                <button
                  onClick={() => onSkillSelect(null)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-mist transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-6 h-1 origin-left rounded-full bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent)/0.7)]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
