import { useFrame } from '@react-three/fiber';
import { useStore } from '@/store/useStore';
import { Vector3 } from 'three';
import { ROOMS } from './House';

const CAMERA_POSITIONS = {
  exterior: new Vector3(14, 12, 14),
  entry: new Vector3(0, 6, 9),
  workshop: new Vector3(-8, 7, 5),
  study: new Vector3(8, 7, 5),
  living: new Vector3(0, 7, 1),
  blueprint: new Vector3(-8, 7, -1),
  library: new Vector3(8, 7, -1),
};

const LOOK_AT_OFFSETS = {
  exterior: new Vector3(0, 2, 0),
  entry: new Vector3(...ROOMS.entry.position),
  workshop: new Vector3(...ROOMS.workshop.position),
  study: new Vector3(...ROOMS.study.position),
  living: new Vector3(...ROOMS.living.position),
  blueprint: new Vector3(...ROOMS.blueprint.position),
  library: new Vector3(...ROOMS.library.position),
};

export default function CameraRig() {
  const currentRoom = useStore(state => state.currentRoom);
  const lookAtTarget = new Vector3(0, 0, 0);

  useFrame((state, delta) => {
    const targetPos = CAMERA_POSITIONS[currentRoom as keyof typeof CAMERA_POSITIONS] || CAMERA_POSITIONS.exterior;
    const targetLook = LOOK_AT_OFFSETS[currentRoom as keyof typeof LOOK_AT_OFFSETS] || LOOK_AT_OFFSETS.exterior;

    // Adjust camera position smoothly
    state.camera.position.lerp(targetPos, delta * 2.5);
    
    // Adjust look target smoothly
    lookAtTarget.lerp(targetLook, delta * 3);
    state.camera.lookAt(lookAtTarget);
  });

  return null;
}