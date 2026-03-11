import { Environment as DreiEnvironment } from '@react-three/drei';
import { useStore } from '@/store/useStore';
import House from './House';
import CameraRig from './CameraRig';
import { SimsCharacters } from './SimsCharacter';

export default function HouseScene() {
  const isNight = useStore(state => state.isNight);
  const currentRoom = useStore(state => state.currentRoom);

  return (
    <>
      <color attach="background" args={[isNight ? '#0a0a10' : '#e0e7ff']} />
      
      {/* Ambient Lighting */}
      <ambientLight intensity={isNight ? 0.3 : 0.7} />
      
      {/* Sun/Moon Light */}
      <directionalLight 
        castShadow 
        position={[10, 20, 10]} 
        intensity={isNight ? 0.5 : 2.5} 
        color={isNight ? '#8b5cf6' : '#fef08a'}
        shadow-mapSize={[2048, 2048]}
      />

      <DreiEnvironment preset={isNight ? "night" : "city"} />
      
      <CameraRig />
      
      <group position={[0, -2, 0]}>
        {/* Ground Plane */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color={isNight ? "#0f172a" : "#cbd5e1"} />
        </mesh>

        <House />
        
        {/* NPCs - Only show when outside or in specific rooms */}
        {(currentRoom === 'exterior' || currentRoom === 'entry' || currentRoom === 'workshop' || currentRoom === 'study' || currentRoom === 'living' || currentRoom === 'library' || currentRoom === 'blueprint') && (
          <SimsCharacters />
        )}
      </group>
    </>
  );
}