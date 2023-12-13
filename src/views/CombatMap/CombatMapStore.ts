import { create } from 'zustand'

export type CombatMapStore = {
    currentMapCoordinates: {x: number, y: number},
    setCurrentMapCoordinates: (coord: {x: number, y: number}) => void
}

const useCombatMapStore = create<CombatMapStore>((set) => ({
    currentMapCoordinates: {x: 0, y: 0},
    setCurrentMapCoordinates: (coord: {x: number, y: number}) => set({currentMapCoordinates: coord})
}))

export default useCombatMapStore;