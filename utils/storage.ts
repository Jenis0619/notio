import { FolderItem } from '../types';

const STORAGE_KEY = 'mini-folder-navigation-data';

export function saveData(data: FolderItem) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadData(): FolderItem | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data) as FolderItem;
  } catch {
    return null;
  }
}
