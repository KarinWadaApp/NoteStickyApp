import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DEFAULT_NOTEBOOKS,
  DISPLAY_LAYOUTS,
  STICKY_STATUS
} from '../utils/constants';
import { generateIdWithPrefix } from '../utils/helpers';

const STORAGE_KEYS = {
  APP_DATA: '@NoteStickyApp_appData',
  SETTINGS: '@NoteStickyApp_settings'
};

/**
 * Initialize default app data structure
 */
function createDefaultAppData() {
  const notebooks = DEFAULT_NOTEBOOKS.map(notebook => ({
    ...notebook,
    pages:
      notebook.id === 'nb-inbox' ||
      notebook.id === 'nb-done' ||
      notebook.id === 'nb-abandoned'
        ? [
            {
              id: generateIdWithPrefix('pg'),
              name: 'All',
              order: 0,
              stickies: []
            }
          ]
        : [
            {
              id: generateIdWithPrefix('pg'),
              name: 'All',
              order: 0,
              stickies: []
            }
          ]
  }));

  return {
    notebooks,
    lastStickyNumber: 0
  };
}

/**
 * Initialize default settings
 */
function createDefaultSettings() {
  return {
    stickyDisplayLayout: DISPLAY_LAYOUTS.VERTICAL
  };
}

/**
 * Load app data from storage
 */
export async function loadAppData() {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.APP_DATA);
    return data ? JSON.parse(data) : createDefaultAppData();
  } catch (error) {
    console.error('Error loading app data:', error);
    return createDefaultAppData();
  }
}

/**
 * Save app data to storage
 */
export async function saveAppData(appData) {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.APP_DATA,
      JSON.stringify(appData)
    );
  } catch (error) {
    console.error('Error saving app data:', error);
  }
}

/**
 * Load settings from storage
 */
export async function loadSettings() {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : createDefaultSettings();
  } catch (error) {
    console.error('Error loading settings:', error);
    return createDefaultSettings();
  }
}

/**
 * Save settings to storage
 */
export async function saveSettings(settings) {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.SETTINGS,
      JSON.stringify(settings)
    );
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

/**
 * Clear all storage (for development)
 */
export async function clearAllStorage() {
  try {
    await AsyncStorage.multiRemove([STORAGE_KEYS.APP_DATA, STORAGE_KEYS.SETTINGS]);
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
}
