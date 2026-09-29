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

const DEFAULT_SKILLS: Skill[] = [
  { _id: '1', name: 'TypeScript', category: 'Frontend', proficiency: 92 },
  { _id: '2', name: 'React', category: 'Frontend', proficiency: 94 },
  { _id: '3', name: 'Next.js', category: 'Frontend', proficiency: 90 },
  { _id: '4', name: 'Three.js', category: 'Frontend', proficiency: 85 },
  { _id: '5', name: 'TailwindCSS', category: 'Frontend', proficiency: 95 },
  { _id: '6', name: 'Node.js', category: 'Backend', proficiency: 88 },
  { _id: '7', name: 'Express.js', category: 'Backend', proficiency: 86 },
  { _id: '8', name: 'MongoDB', category: 'Database', proficiency: 90 },
  { _id: '9', name: 'Docker', category: 'DevOps', proficiency: 84 },
  { _id: '10', name: 'Socket.IO', category: 'Backend', proficiency: 88 },
  { _id: '11', name: 'Git & GitHub', category: 'Tools', proficiency: 92 },
  { _id: '12', name: 'REST APIs', category: 'Backend', proficiency: 95 },
  { _id: '13', name: 'WebSockets', category: 'Backend', proficiency: 86 },
  { _id: '14', name: 'JavaScript', category: 'Frontend', proficiency: 95 },
  { _id: '15', name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 95 },
  { _id: '16', name: 'Cloud Deploy', category: 'DevOps', proficiency: 85 },
];

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
                  className={`px-3 py-1.5 text-[11px] font-mono font-medium rounded-full border backdrop-blur-md pointer-events-none whitespace-nowrap transition-all duration-300 select-none ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`}
                  style={{
                    backgroundColor: isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.92)',
                    WebkitBackdropFilter: 'blur(8px)',
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
  const [skills, setSkills] = useState<Skill[]>(DEFAULT_SKILLS);
  const [isHovering, setIsHovering] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Detect WebGL support for universal browser compatibility
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    fetchSkills()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const sorted = data.sort((a: Skill, b: Skill) => b.proficiency - a.proficiency);
          setSkills(sorted);
        }
      })
      .catch(() => {
        setSkills(DEFAULT_SKILLS);
      });
  }, []);

  // Calculate average proficiency
  const avgProficiency = Math.round(
    skills.reduce((acc, s) => acc + s.proficiency, 0) / (skills.length || 1)
  );

  return (
    <div className="relative w-full">
      {/* Stats Badge */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] dark:bg-slate-900 rounded-full border border-[#E2E8F0] dark:border-slate-800">
          <span className="text-xs font-mono text-[#475569] dark:text-slate-400">Skills:</span>
          <span className="text-xs font-mono font-bold text-[#0B1120] dark:text-white">{skills.length}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] dark:bg-slate-900 rounded-full border border-[#E2E8F0] dark:border-slate-800">
          <span className="text-xs font-mono text-[#475569] dark:text-slate-400">Avg Proficiency:</span>
          <span className="text-xs font-mono font-bold text-[#2563EB]">{avgProficiency}%</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] dark:bg-slate-900 rounded-full border border-[#E2E8F0] dark:border-slate-800">
          <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
          <span className="text-xs font-mono text-[#475569] dark:text-slate-400">3D Active</span>
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div 
        className="h-[420px] w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[#E2E8F0] dark:border-slate-800 bg-gradient-to-br from-white via-[#F8FAFC] to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 shadow-xl shadow-[#2563EB]/5 relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {hasWebGL ? (
          <Canvas 
            camera={{ position: [0, 1.5, 6], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            style={{ width: '100%', height: '100%', touchAction: 'none' }}
          >
            <ambientLight intensity={0.6} />
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
        ) : (
          <div className="h-full w-full flex flex-wrap items-center justify-center p-8 gap-3 overflow-y-auto">
            {skills.map((s) => (
              <span key={s._id} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-mono font-semibold border border-blue-200">
                {s.name} ({s.proficiency}%)
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hint text */}
      <p className="text-center text-[10px] text-[#94A3B8] font-mono mt-3 select-none">
        Hover on a skill node • Drag to rotate in 3D • Scroll to zoom (Supported on Chrome, Safari, Firefox, Edge, Mobile)
      </p>
    </div>
  );
}