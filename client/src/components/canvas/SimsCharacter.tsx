import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3, MathUtils } from 'three';

interface CharacterProps {
  name: string;
  position: [number, number, number];
  color: string;
  waypoints: Vector3[];
  scale?: number;
}

export function SimsCharacter({ name, position: initialPos, color, waypoints, scale = 1 }: CharacterProps) {
  const groupRef = useRef<Group>(null);
  const [currentWaypoint, setCurrentWaypoint] = useState(0);
  const [behavior, setBehavior] = useState<'walk' | 'idle' | 'interact'>('idle');
  const [idleTimer, setIdleTimer] = useState(0);
  const headRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);

  const position = useMemo(() => new Vector3(...initialPos), [initialPos]);

  useFrame((state, delta) => {
    if (!groupRef.current || waypoints.length === 0) return;

    const targetWaypoint = new Vector3().copy(waypoints[currentWaypoint]);
    const directionToTarget = new Vector3()
      .subVectors(targetWaypoint, position)
      .normalize();

    const distanceToTarget = position.distanceTo(targetWaypoint);

    // Switch behavior based on distance
    if (distanceToTarget < 0.5) {
      setBehavior('idle');
      setIdleTimer((prev) => prev + delta);

      // Stay idle for 3-4 seconds then move to next waypoint
      if (idleTimer > MathUtils.randFloat(3, 4)) {
        setCurrentWaypoint((prev) => (prev + 1) % waypoints.length);
        setIdleTimer(0);
      }
    } else {
      setBehavior('walk');
    }

    // Move character
    if (behavior === 'walk') {
      const moveSpeed = 2.5;
      position.add(directionToTarget.multiplyScalar(moveSpeed * delta));
      groupRef.current.position.copy(position);

      // Face direction of movement
      groupRef.current.rotation.y = Math.atan2(directionToTarget.x, directionToTarget.z);
    }

    // Idle animation
    if (behavior === 'idle') {
      const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      groupRef.current.position.y = initialPos[1] + breathe;

      // Occasional head turning
      if (headRef.current) {
        headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      }
    }

    // Walk animation - arm and leg swing
    if (behavior === 'walk') {
      const walkCycle = state.clock.elapsedTime * 4;

      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = Math.sin(walkCycle) * 0.8;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = Math.sin(walkCycle + Math.PI) * 0.8;
      }
      if (leftLegRef.current) {
        leftLegRef.current.rotation.x = Math.sin(walkCycle) * 0.6;
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x = Math.sin(walkCycle + Math.PI) * 0.6;
      }
    } else {
      // Reset limbs on idle
      if (leftArmRef.current) leftArmRef.current.rotation.z = MathUtils.lerp(leftArmRef.current.rotation.z, 0, 0.1);
      if (rightArmRef.current) rightArmRef.current.rotation.z = MathUtils.lerp(rightArmRef.current.rotation.z, 0, 0.1);
      if (leftLegRef.current) leftLegRef.current.rotation.x = MathUtils.lerp(leftLegRef.current.rotation.x, 0, 0.1);
      if (rightLegRef.current) rightLegRef.current.rotation.x = MathUtils.lerp(rightLegRef.current.rotation.x, 0, 0.1);
    }
  });

  return (
    <group ref={groupRef} position={initialPos}>
      {/* Torso */}
      <mesh position={[0, 0.5 * scale, 0]} castShadow>
        <boxGeometry args={[0.4 * scale, 0.8 * scale, 0.3 * scale]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh ref={headRef} position={[0, 1.3 * scale, 0.05 * scale]} castShadow>
        <sphereGeometry args={[0.35 * scale, 8, 8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>

      {/* Left Arm */}
      <mesh ref={leftArmRef} position={[-0.3 * scale, 0.9 * scale, 0]} castShadow>
        <cylinderGeometry args={[0.08 * scale, 0.08 * scale, 0.6 * scale, 8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>

      {/* Right Arm */}
      <mesh ref={rightArmRef} position={[0.3 * scale, 0.9 * scale, 0]} castShadow>
        <cylinderGeometry args={[0.08 * scale, 0.08 * scale, 0.6 * scale, 8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>

      {/* Left Hand (Paddle) */}
      <mesh position={[-0.3 * scale, 0.3 * scale, 0]} castShadow>
        <boxGeometry args={[0.12 * scale, 0.15 * scale, 0.1 * scale]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>

      {/* Right Hand (Paddle) */}
      <mesh position={[0.3 * scale, 0.3 * scale, 0]} castShadow>
        <boxGeometry args={[0.12 * scale, 0.15 * scale, 0.1 * scale]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>

      {/* Left Leg */}
      <mesh ref={leftLegRef} position={[-0.15 * scale, 0.15 * scale, 0]} castShadow>
        <cylinderGeometry args={[0.08 * scale, 0.08 * scale, 0.6 * scale, 8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>

      {/* Right Leg */}
      <mesh ref={rightLegRef} position={[0.15 * scale, 0.15 * scale, 0]} castShadow>
        <cylinderGeometry args={[0.08 * scale, 0.08 * scale, 0.6 * scale, 8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>

      {/* Left Foot */}
      <mesh position={[-0.15 * scale, -0.2 * scale, 0.1 * scale]} castShadow>
        <boxGeometry args={[0.15 * scale, 0.1 * scale, 0.2 * scale]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>

      {/* Right Foot */}
      <mesh position={[0.15 * scale, -0.2 * scale, 0.1 * scale]} castShadow>
        <boxGeometry args={[0.15 * scale, 0.1 * scale, 0.2 * scale]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>

      {/* Name tag / indicator */}
      <mesh position={[0, 1.8 * scale, 0]}>
        <boxGeometry args={[0.4 * scale, 0.15 * scale, 0.05 * scale]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

export function SimsCharacters() {
  return (
    <group>
      {/* Andres - Entry ↔ Study */}
      <SimsCharacter
        name="Andres"
        position={[0, 0.3, 4]}
        color="#3b82f6"
        waypoints={[
          new Vector3(0, 0.3, 4),
          new Vector3(4, 0.3, 0),
        ]}
        scale={0.85}
      />

      {/* Alex - Workshop station */}
      <SimsCharacter
        name="Alex"
        position={[-4, 0.3, -1]}
        color="#f43f5e"
        waypoints={[
          new Vector3(-1, 0.3, -1),
          new Vector3(1, 0.3, -1),
          new Vector3(1, 0.3, 1),
          new Vector3(-1, 0.3, 1),
        ]}
        scale={0.85}
      />

      {/* Ricardo - Living Room ↔ Library */}
      <SimsCharacter
        name="Ricardo"
        position={[0, 0.3, -4]}
        color="#10b981"
        waypoints={[
          new Vector3(0, 0.3, -4),
          new Vector3(4, 0.3, -4),
        ]}
        scale={0.85}
      />
    </group>
  );
}