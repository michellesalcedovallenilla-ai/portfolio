import { useRef } from 'react';
import { useStore } from '@/store/useStore';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import { Box } from '@react-three/drei';
import { 
  Workstation, 
  ReceptionStand, 
  Desk, 
  FloatingFolder, 
  Orb, 
  BlueprintTable, 
  Bookshelf 
} from './Furniture';

// Room coordinates and data
export const ROOMS = {
  exterior: { position: [0, 0, 0], color: '#1e293b' },
  entry: { position: [0, 0, 4], color: '#334155' },
  workshop: { position: [-4, 0, 0], color: '#475569' },
  study: { position: [4, 0, 0], color: '#475569' },
  living: { position: [0, 0, -4], color: '#334155' },
  blueprint: { position: [-4, 0, -4], color: '#1e293b' },
  library: { position: [4, 0, -4], color: '#1e293b' },
};

function Room({ name, position, color, size = [3.8, 3, 3.8], children }: any) {
  const currentRoom = useStore(state => state.currentRoom);
  const isSelected = currentRoom === name;
  const isExterior = currentRoom === 'exterior';
  const setRoom = useStore(state => state.setRoom);
  
  // Only render children (furniture) if we are inside the house or the room is selected
  const showContent = !isExterior || isSelected;

  return (
    <group position={position}>
      {/* Floor */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[size[0] - 0.1, 0.1, size[2] - 0.1]} />
        <meshStandardMaterial color={isSelected ? "#cbd5e1" : color} roughness={0.8} />
      </mesh>

      {/* Walls (Invisible click targets that show up slightly when selected/hovered outside) */}
      <mesh 
        castShadow={false}
        receiveShadow 
        position={[0, size[1]/2, 0]}
        onClick={(e) => {
          e.stopPropagation();
          if (name !== 'exterior') setRoom(name);
        }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <boxGeometry args={size} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={isExterior ? 0.8 : (isSelected ? 0 : 0.2)}
          roughness={1}
          depthWrite={isExterior}
        />
      </mesh>

      {/* Room Content (Furniture) */}
      {showContent && (
        <group>{children}</group>
      )}
    </group>
  );
}

export default function House() {
  const currentRoom = useStore(state => state.currentRoom);
  const isExterior = currentRoom === 'exterior';
  const doorRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (doorRef.current) {
      const targetRotation = currentRoom !== 'exterior' ? -Math.PI / 1.8 : 0;
      doorRef.current.rotation.y = MathUtils.lerp(doorRef.current.rotation.y, targetRotation, delta * 4);
    }
  });

  return (
    <group>
      {/* Base Foundation */}
      <mesh receiveShadow position={[0, 0.1, 0]}>
        <boxGeometry args={[13, 0.2, 13]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Main Structure Container */}
      <group position={[0, 0.2, 0]}>
        
        {/* Entry Foyer */}
        <Room name="entry" position={ROOMS.entry.position} color={ROOMS.entry.color}>
          <ReceptionStand position={[0, 0, -1]} />
        </Room>

        {/* Workshop */}
        <Room name="workshop" position={ROOMS.workshop.position} color={ROOMS.workshop.color}>
          <Workstation position={[-1, 0, -1]} />
          <Workstation position={[1, 0, -1]} />
          <Workstation position={[-1, 0, 1]} />
          <Workstation position={[1, 0, 1]} />
        </Room>

        {/* Study */}
        <Room name="study" position={ROOMS.study.position} color={ROOMS.study.color}>
          <Desk position={[0, 0, -1]} color="#1e293b" />
          {/* Floating folders above desk */}
          <group position={[0, 1.5, -1]}>
            <FloatingFolder position={[-0.4, 0, 0]} color="#3b82f6" />
            <FloatingFolder position={[-0.1, 0.1, 0]} color="#f43f5e" />
            <FloatingFolder position={[0.2, 0, 0.1]} color="#10b981" />
            <FloatingFolder position={[0.5, 0.2, 0]} color="#a855f7" />
          </group>
        </Room>

        {/* Living Room */}
        <Room name="living" position={ROOMS.living.position} color={ROOMS.living.color}>
          <Orb position={[0, 1.5, 0]} color="#8b5cf6" />
          <Box args={[1.5, 0.2, 1.5]} position={[0, 0.1, 0]} receiveShadow>
            <meshStandardMaterial color="#475569" roughness={1} />
          </Box>
        </Room>

        {/* Blueprint Room */}
        <Room name="blueprint" position={ROOMS.blueprint.position} color={ROOMS.blueprint.color}>
          <BlueprintTable position={[0, 0, 0]} />
        </Room>

        {/* Library */}
        <Room name="library" position={ROOMS.library.position} color={ROOMS.library.color}>
          <Bookshelf position={[0, 0, -1.6]} />
          <Bookshelf position={[-1.6, 0, 0]} />
        </Room>

        {/* Front Door */}
        <group position={[0, 0, 5.9]} ref={doorRef}>
          <mesh position={[0.5, 1, 0]} castShadow onClick={(e) => {
            e.stopPropagation();
            useStore.getState().setRoom('entry');
          }}
          onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; }}>
            <boxGeometry args={[1, 2, 0.1]} />
            <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.8} />
          </mesh>
        </group>

        {/* Inner Walls separating rooms (only visible when inside) */}
        {!isExterior && (
          <group>
            <Box args={[12, 3, 0.2]} position={[0, 1.5, -2]} castShadow receiveShadow>
              <meshStandardMaterial color="#1e293b" roughness={0.9} />
            </Box>
            <Box args={[12, 3, 0.2]} position={[0, 1.5, 2]} castShadow receiveShadow>
              <meshStandardMaterial color="#1e293b" roughness={0.9} />
            </Box>
            <Box args={[0.2, 3, 12]} position={[-2, 1.5, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#1e293b" roughness={0.9} />
            </Box>
            <Box args={[0.2, 3, 12]} position={[2, 1.5, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#1e293b" roughness={0.9} />
            </Box>
          </group>
        )}
        
        {/* Roof - Hide when inside */}
        <mesh position={[0, 4.5, 0]} castShadow visible={isExterior}
          onClick={(e) => {
            e.stopPropagation();
            useStore.getState().setRoom('entry');
          }}
          onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; }}>
          <coneGeometry args={[11, 3, 4]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}