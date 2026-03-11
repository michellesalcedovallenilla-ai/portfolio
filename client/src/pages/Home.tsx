import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import HouseScene from '@/components/canvas/HouseScene';
import Overlay from '@/components/ui/Overlay';

export default function Home() {
  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [15, 15, 15], fov: 45 }}>
        <Suspense fallback={
          <mesh><boxGeometry/><meshBasicMaterial color="gray"/></mesh>
        }>
          <HouseScene />
        </Suspense>
      </Canvas>

      {/* 2D UI Overlay */}
      <Overlay />
    </div>
  );
}