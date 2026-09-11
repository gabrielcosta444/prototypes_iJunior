import type { PlantMap } from './types';

const STORAGE_KEY = 'general-green:plants:v1';

export function loadStoredPlants(): PlantMap[] | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed as PlantMap[];
  } catch {
    return null;
  }
}

export function storePlants(plants: PlantMap[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
}
