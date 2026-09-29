'use client';
import { useEffect, useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html, Float } from '@react-three/drei';
import type { Group } from 'three';
import { fetchSkills } from '@/lib/api';

interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number; // 0-100
}

// Map proficiency to blue gradient color
const getBlueColor = (proficiency: number) => {
  if (proficiency < 30) return '#93C5FD'; // Light blue
  if (proficiency < 50) return '#60A5FA'; // Medium blue
  if (proficiency < 70) return '#3B82F6'; // Standard blue
  if (proficiency < 85) return '#2563EB'; // Deep blue
  return '#1D4ED8'; // Darkest blue
};

// Get glow intensity based on proficiency
const getGlowIntensity = (proficiency: number) => {
  return 0.2 + (proficiency / 100) * 0.8;
};

function SkillSphere({ skills }: { skills: Skill[] }) {
  const groupRef = useRef<Group>(null);
  const radius = 2.8;
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Auto-rotation speed control
  useFrame((state) => {
    if (groupRef.current && !state.mouse) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glowing core sphere */}
      <Sphere args={[0.3, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#2563EB" 
          emissive="#3B82F6"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Inner glow ring */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Sphere args={[0.8, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#3B82F6" 
            emissive="#60A5FA"
            emissiveIntensity={0.1}
            transparent
            opacity={0.08}
            wireframe
          />
        </Sphere>
      </Float>

      {skills.map((skill, i) => {
        // Fibonacci sphere mapping for even distribution
        const phi = Math.acos(-1 + (2 * i + 1) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        // Scale sphere based on proficiency (0.08 to 0.45)
        const size = 0.08 + (skill.proficiency / 100) * 0.37;
        const color = getBlueColor(skill.proficiency);
        const glowIntensity = getGlowIntensity(skill.proficiency);
        const isHovered = hoveredSkill === skill._id;

        return (
          <Float 
            key={skill._id} 
            speed={0.5 + (i % 3) * 0.2} 
            rotationIntensity={0.1} 
            floatIntensity={0.1 + (i % 4) * 0.05}
          >
            <mesh 
              position={[x, y, z]}
              onPointerOver={() => setHoveredSkill(skill._id)}
              onPointerOut={() => setHoveredSkill(null)}
            >
              <sphereGeometry args={[isHovered ? size * 1.5 : size, 24, 24]} />
              <meshStandardMaterial 
                color={color}
                emissive={color}
                emissiveIntensity={isHovered ? 0.8 : glowIntensity}
                roughness={isHovered ? 0.1 : 0.3}
                metalness={isHovered ? 0.5 : 0.1}
                transparent
                opacity={isHovered ? 1 : 0.9}
              />
              
              {/* Glow halo on hover */}
              {isHovered && (
                <Sphere args={[size * 2, 16, 16]} position={[0, 0, 0]}>
                  <meshStandardMaterial 
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.2}
                  />
                </Sphere>
              )}

              {/* Label */}
              <Html distanceFactor={6} center>
                <div 
                  className={`px-3 py-1.5 text-[11px] font-mono font-medium rounded-full border backdrop-blur-sm pointer-events-none whitespace-nowrap transition-all duration-300 ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`}
                  style={{
                    backgroundColor: isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.9)',
                    borderColor: isHovered ? '#2563EB' : '#E2E8F0',
                    color: '#0B1120',
                    boxShadow: isHovered 
                      ? '0 8px 30px rgba(37, 99, 235, 0.3)' 
                      : '0 4px 12px rgba(0, 0, 0, 0.06)',
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {skill.name}
                  {isHovered && (
                    <span className="ml-2 text-[10px] text-[#2563EB] font-bold">
                      {skill.proficiency}%
                    </span>
                  )}
                </div>
              </Html>
            </mesh>
          </Float>
        );
      })}

      {/* Orbiting particle ring */}
      <Float speed={0.3} rotationIntensity={0} floatIntensity={0}>
        <group>
          {Array.from({ length: 60 }).map((_, i) => {
            const angle = (i / 60) * Math.PI * 2;
            const ringRadius = radius + 0.6;
            return (
              <mesh 
                key={i}
                position={[
                  Math.cos(angle) * ringRadius,
                  Math.sin(angle * 2) * 0.3,
                  Math.sin(angle) * ringRadius,
                ]}
              >
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshStandardMaterial 
                  color="#60A5FA" 
                  emissive="#3B82F6"
                  emissiveIntensity={0.5}
                  transparent
                  opacity={0.6}
                />
              </mesh>
            );
          })}
        </group>
      </Float>
    </group>
  );
}

export default function SkillsGlobe() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    fetchSkills()
      .then((data) => {
        const sorted = data.sort((a: Skill, b: Skill) => b.proficiency - a.proficiency);
        setSkills(sorted);
      })
      .catch(() => setSkills([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-96 w-full max-w-3xl mx-auto flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-[#E2E8F0] border-t-[#2563EB] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#2563EB]/10 animate-pulse" />
          </div>
        </div>
        <p className="mt-4 text-sm text-[#94A3B8] font-mono">Loading skills arsenal...</p>
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-[#94A3B8]">
        <span className="text-4xl mb-2">🔧</span>
        <p className="text-sm font-mono">No skills data available</p>
      </div>
    );
  }

  // Calculate average proficiency
  const avgProficiency = Math.round(
    skills.reduce((acc, s) => acc + s.proficiency, 0) / skills.length
  );

  return (
    <div className="relative">
      {/* Stats Badge */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] rounded-full border border-[#E2E8F0]">
          <span className="text-xs font-mono text-[#475569]">Skills:</span>
          <span className="text-xs font-mono font-bold text-[#0B1120]">{skills.length}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] rounded-full border border-[#E2E8F0]">
          <span className="text-xs font-mono text-[#475569]">Avg Proficiency:</span>
          <span className="text-xs font-mono font-bold text-[#2563EB]">{avgProficiency}%</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] rounded-full border border-[#E2E8F0]">
          <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
          <span className="text-xs font-mono text-[#475569]">Live</span>
        </div>
      </div>

      {/* 3D Canvas */}
      <div 
        className="h-[420px] w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[#E2E8F0] bg-gradient-to-br from-white via-[#F8FAFC] to-white shadow-xl shadow-[#2563EB]/5"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Canvas camera={{ position: [0, 1.5, 6], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#FFFFFF" />
          <pointLight position={[-5, -5, 10]} intensity={0.8} color="#3B82F6" />
          <pointLight position={[5, -5, -5]} intensity={0.5} color="#06B6D4" />
          
          <Suspense fallback={null}>
            <SkillSphere skills={skills} />
          </Suspense>
          
          <OrbitControls 
            enableZoom={true}
            zoomSpeed={0.5}
            enablePan={false}
            autoRotate={!isHovering}
            autoRotateSpeed={1.0}
            enableDamping
            dampingFactor={0.08}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            rotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Hint text */}
      <p className="text-center text-[10px] text-[#94A3B8] font-mono mt-3 select-none">
        Hover on a skill to see proficiency • Drag to rotate • Scroll to zoom
      </p>
    </div>
  );
}