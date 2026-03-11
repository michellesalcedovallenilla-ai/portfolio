import { Box, Cylinder, Sphere } from '@react-three/drei';

export function Desk({ position = [0, 0, 0], color = "#475569" }: { position?: [number, number, number], color?: string }) {
  return (
    <group position={position}>
      {/* Top */}
      <Box args={[1.6, 0.1, 0.8]} position={[0, 0.7, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.8} />
      </Box>
      {/* Legs */}
      <Box args={[0.1, 0.7, 0.1]} position={[-0.7, 0.35, -0.3]} castShadow receiveShadow>
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </Box>
      <Box args={[0.1, 0.7, 0.1]} position={[0.7, 0.35, -0.3]} castShadow receiveShadow>
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </Box>
      <Box args={[0.1, 0.7, 0.1]} position={[-0.7, 0.35, 0.3]} castShadow receiveShadow>
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </Box>
      <Box args={[0.1, 0.7, 0.1]} position={[0.7, 0.35, 0.3]} castShadow receiveShadow>
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </Box>
    </group>
  );
}

export function Bookshelf({ position = [0, 0, 0], color = "#334155" }: { position?: [number, number, number], color?: string }) {
  return (
    <group position={position}>
      <Box args={[2, 2.5, 0.5]} position={[0, 1.25, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.9} />
      </Box>
      {/* Books suggestion */}
      <Box args={[0.2, 0.4, 0.3]} position={[-0.7, 0.8, 0.1]} castShadow>
        <meshStandardMaterial color="#3b82f6" roughness={0.5} />
      </Box>
      <Box args={[0.15, 0.45, 0.3]} position={[-0.4, 0.8, 0.1]} castShadow>
        <meshStandardMaterial color="#f43f5e" roughness={0.5} />
      </Box>
      <Box args={[0.25, 0.35, 0.3]} position={[-0.1, 0.8, 0.1]} castShadow>
        <meshStandardMaterial color="#eab308" roughness={0.5} />
      </Box>
    </group>
  );
}

export function Orb({ position = [0, 1, 0], color = "#3b82f6" }: { position?: [number, number, number], color?: string }) {
  return (
    <Sphere args={[0.5, 16, 16]} position={position} castShadow>
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} emissive={color} emissiveIntensity={0.2} />
    </Sphere>
  );
}

export function FloatingFolder({ position = [0, 1, 0], color = "#f8fafc" }: { position?: [number, number, number], color?: string }) {
  return (
    <group position={position} rotation={[0.2, 0.5, 0]}>
      <Box args={[0.4, 0.5, 0.05]} castShadow>
        <meshStandardMaterial color={color} roughness={0.4} />
      </Box>
    </group>
  );
}

export function Workstation({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      <Desk color="#475569" />
      {/* Monitor */}
      <Box args={[0.8, 0.5, 0.05]} position={[0, 1, -0.1]} rotation={[-0.1, 0, 0]} castShadow>
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
      </Box>
      {/* Screen glow */}
      <Box args={[0.7, 0.4, 0.01]} position={[0, 1, -0.07]} rotation={[-0.1, 0, 0]}>
        <meshBasicMaterial color="#3b82f6" />
      </Box>
    </group>
  );
}

export function BlueprintTable({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      <Desk color="#334155" />
      {/* Blueprint paper */}
      <Box args={[1.2, 0.02, 0.6]} position={[0, 0.76, 0]} rotation={[0, 0.2, 0]} castShadow>
        <meshStandardMaterial color="#93c5fd" roughness={0.9} />
      </Box>
    </group>
  );
}

export function ReceptionStand({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      <Box args={[2, 1.2, 0.6]} position={[0, 0.6, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </Box>
      <Box args={[2.2, 0.1, 0.8]} position={[0, 1.25, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
      </Box>
    </group>
  );
}