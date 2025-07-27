import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Box, Torus } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import SEO from '../components/SEO';
import { siteConfig } from '../constants/siteConfig';

// Animated 3D Sphere with gradient material
function AnimatedSphere() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial
        color="#6366f1"
        metalness={0.7}
        roughness={0.2}
        emissive="#1e1b4b"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

// Floating geometric shapes
function FloatingShapes() {
  return (
    <>
      <FloatingBox position={[-3, 2, -2]} />
      <FloatingTorus position={[3, -1, -1]} />
      <FloatingBox position={[2, 3, -3]} scale={0.6} />
      <FloatingTorus position={[-2, -2, 1]} scale={0.8} />
    </>
  );
}

// Individual floating box
function FloatingBox({ position, scale = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial
        color="#ec4899"
        metalness={0.5}
        roughness={0.3}
        emissive="#831843"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

// Individual floating torus
function FloatingTorus({ position, scale = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.z += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2 + position[0]) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[0.4, 0.15, 16, 100]} />
      <meshStandardMaterial
        color="#10b981"
        metalness={0.6}
        roughness={0.2}
        emissive="#064e3b"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

// Loading fallback for 3D scene
function SceneLoader() {
  return (
    <div className="h-[400px] mb-8 flex items-center justify-center bg-gray-100 rounded-lg">
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
          style={{ height: '500px' }}
          className="rounded-lg bg-gradient-to-br from-slate-900 to-slate-800"
          camera={{ position: [0, 0, 6], fov: 75 }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />
          <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} />

          <AnimatedSphere />
          <FloatingShapes />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 2.2}
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
