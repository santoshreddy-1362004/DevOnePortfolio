import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  
  // Reduced particle count for better performance
  const particlesCount = 800; // Further reduced from 1500 to 800
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      // Faster but smoother rotation for better responsiveness
      ref.current.rotation.x -= delta * 0.1;
      ref.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00ffff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const FloatingCube: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Reduced animation intensity for better performance
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial 
        color="#ff00ff" 
        emissive="#ff00ff" 
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

const FloatingSphere: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Reduced animation intensity for better performance
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial 
        color="#ffff00" 
        emissive="#ffff00" 
        emissiveIntensity={0.3}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

const Background3D: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        zIndex: -1
      }}
      gl={{ 
        antialias: false, // Disable antialiasing for better performance
        alpha: true,
        powerPreference: "high-performance"
      }}
      dpr={[1, 1.5]} // Limit pixel ratio for better performance
      performance={{ min: 0.5 }} // Lower minimum performance threshold
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      <ParticleField />
      
      {/* Reduced number of floating objects */}
      <FloatingCube position={[-2, 1, -5]} />
      <FloatingCube position={[2, -1, -3]} />
      
      <FloatingSphere position={[-1, -2, -2]} />
      <FloatingSphere position={[3, 1, -6]} />
    </Canvas>
  );
};

export default Background3D;