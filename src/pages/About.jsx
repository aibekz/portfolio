import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import SEO from '../components/SEO';
import { siteConfig } from '../constants/siteConfig';

// Planet Earth with realistic texture
function Earth() {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005; // Slow rotation
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        color="#4a90e2"
        metalness={0.1}
        roughness={0.8}
        emissive="#0a4d8c"
        emissiveIntensity={0.1}
      />
      {/* Continents as darker patches */}
      <mesh position={[0, 0, 2.01]}>
        <sphereGeometry args={[2.01, 32, 32]} />
        <meshStandardMaterial
          color="#2d5016"
          transparent
          opacity={0.6}
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
    </mesh>
  );
}

// Rubber Duck orbiting around Earth
function RubberDuck() {
  const duckRef = useRef();
  const orbitRadius = 4;

  useFrame((state) => {
    if (duckRef.current) {
      const time = state.clock.elapsedTime * 0.5;
      
      // Circular orbit around Earth
      duckRef.current.position.x = Math.cos(time) * orbitRadius;
      duckRef.current.position.z = Math.sin(time) * orbitRadius;
      duckRef.current.position.y = Math.sin(time * 2) * 0.5; // Slight vertical bobbing
      
      // Make duck face the direction it's moving
      duckRef.current.rotation.y = time + Math.PI / 2;
      
      // Slight bobbing rotation
      duckRef.current.rotation.x = Math.sin(time * 3) * 0.1;
      duckRef.current.rotation.z = Math.sin(time * 2) * 0.05;
    }
  });

  return (
    <group ref={duckRef}>
      {/* Duck Body */}
      <mesh position={[0, 0, 0]} scale={[0.8, 0.6, 1]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color="#ffeb3b"
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>
      
      {/* Duck Head */}
      <mesh position={[0, 0.4, 0.3]} scale={[0.6, 0.6, 0.6]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color="#ffeb3b"
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>
      
      {/* Duck Beak */}
      <mesh position={[0, 0.35, 0.65]} rotation={[0, 0, 0]} scale={[0.3, 0.2, 0.4]}>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshStandardMaterial
          color="#ff9800"
          metalness={0.2}
          roughness={0.4}
        />
      </mesh>
      
      {/* Duck Eyes */}
      <mesh position={[-0.15, 0.5, 0.5]} scale={[0.8, 0.8, 0.8]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.15, 0.5, 0.5]} scale={[0.8, 0.8, 0.8]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Duck Wing */}
      <mesh position={[0.4, 0.1, 0]} rotation={[0, 0, 0.3]} scale={[0.3, 0.5, 0.8]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshStandardMaterial
          color="#f9c74f"
          metalness={0.1}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[-0.4, 0.1, 0]} rotation={[0, 0, -0.3]} scale={[0.3, 0.5, 0.8]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshStandardMaterial
          color="#f9c74f"
          metalness={0.1}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

// Loading fallback for 3D scene
function SceneLoader() {
  return (
    <div className="h-[600px] mb-8 flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-body text-gray-500 font-mono">Loading 3D scene...</div>
    </div>
  );
}

// 3D Scene Component
function Scene() {
  return (
    <div className="mb-8">
      <Suspense fallback={<SceneLoader />}>
        <Canvas
          style={{ height: '600px' }}
          className="rounded-lg bg-gradient-to-br from-slate-900 to-slate-800"
          camera={{ position: [8, 4, 8], fov: 60 }}
        >
          {/* Lighting setup */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <pointLight position={[-10, -10, -5]} intensity={0.8} color="#4f46e5" />
          <spotLight 
            position={[0, 15, 0]} 
            angle={0.4} 
            penumbra={1} 
            intensity={0.8}
          />

          {/* Main scene objects */}
          <Earth />
          <RubberDuck />
          
          {/* Background stars */}
          <Stars 
            radius={150} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={0.5} 
          />

          {/* Interactive controls - full movement and zoom */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.8}
            rotateSpeed={0.4}
            minDistance={3}
            maxDistance={20}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default function About() {
  const aboutDescription = "Learn more about Aibek Zhumabekov, a full-stack developer passionate about building meaningful web applications.";

  return (
    <>
      <SEO
        title="About"
        description={aboutDescription}
        url={`${siteConfig.url}about`}
      />
      <div className="px-6 py-20 max-w-4xl mx-auto">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">🌍 Rubber Duck's Space Adventure 🦆</h2>
          <p className="text-gray-300 font-mono text-sm">
            Use mouse to rotate • Scroll to zoom • Drag to pan
          </p>
        </div>
        
        <Scene />

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="">
            <p className="text-body mb-6 text-gray-700 text-center font-mono">
              Hello, I'm a software developer based in the USA!
            </p>
            <h1 className="text-header font-bold font-mono mb-3 text-gray-900">
              {siteConfig.name}
            </h1>
            <p className="text-body mb-8 text-gray-600 font-mono">
              Digital Craftsman ( Artist / Developer / Designer )
            </p>
          </div>

          <section className="prose prose-lg max-w-none">
            <div>
              <h2 className="text-header font-semibold mb-4 text-gray-900 font-mono">About</h2>
              <p className="text-body leading-relaxed text-gray-700 mb-4 font-mono">
                Aibek is a full-stack developer based in Austin, TX, passionate about building meaningful,
                engaging, accessible, and user-centric web applications. He has a knack for launching products—from planning and design to solving real-world problems through code.
              </p>
              <p className="text-body leading-relaxed text-gray-700 mb-4 font-mono">
                His approach combines technical expertise with creative problem-solving, ensuring that
                every project not only functions flawlessly but also delivers an exceptional user experience.
              </p>
              <p className="text-body leading-relaxed text-gray-700 font-mono">
                When he's not online, he enjoys spending time behind the lens with his camera.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
