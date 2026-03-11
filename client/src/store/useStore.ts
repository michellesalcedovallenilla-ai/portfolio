import { create } from 'zustand'

type RoomId = 'exterior' | 'entry' | 'workshop' | 'study' | 'living' | 'blueprint' | 'library'

interface AppState {
  currentRoom: RoomId
  isNight: boolean
  setRoom: (room: RoomId) => void
  toggleNightMode: () => void
}

export const useStore = create<AppState>((set) => ({
  currentRoom: 'exterior',
  isNight: false,
  setRoom: (room) => set({ currentRoom: room }),
  toggleNightMode: () => set((state) => ({ isNight: !state.isNight })),
}))