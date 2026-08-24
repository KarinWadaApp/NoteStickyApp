import React, { createContext, useState, useEffect } from 'react';
import { loadAppData, saveAppData, loadSettings, saveSettings } from '../storage/storageService';
import { generateIdWithPrefix } from '../utils/helpers';
import { DISPLAY_LAYOUTS, STICKY_STATUS } from '../utils/constants';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appData, setAppData] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize app on startup
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      const data = await loadAppData();
      const loadedSettings = await loadSettings();
      setAppData(data);
      setSettings(loadedSettings);
    } catch (error) {
      console.error('Error initializing app:', error);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // NOTEBOOK OPERATIONS
  // ============================================

  /**
   * Get all notebooks
   */
  const getNotebooks = () => {
    return appData?.notebooks || [];
  };

  /**
   * Get notebook by ID
   */
  const getNotebookById = (notebookId) => {
    return appData?.notebooks.find(nb => nb.id === notebookId);
  };

  /**
   * Update notebook
   */
  const updateNotebook = (notebookId, updates) => {
    const newAppData = { ...appData };
    const notebook = newAppData.notebooks.find(nb => nb.id === notebookId);
    if (notebook) {
      Object.assign(notebook, updates);
      setAppData(newAppData);
      saveAppData(newAppData);
    }
  };

  // ============================================
  // PAGE OPERATIONS
  // ============================================

  /**
   * Get all pages for a notebook
   */
  const getPages = (notebookId) => {
    const notebook = getNotebookById(notebookId);
    return notebook?.pages || [];
  };

  /**
   * Get page by ID
   */
  const getPageById = (notebookId, pageId) => {
    const notebook = getNotebookById(notebookId);
    return notebook?.pages.find(pg => pg.id === pageId);
  };

  /**
   * Get default page (first page) for a notebook
   */
  const getDefaultPage = (notebookId) => {
    const pages = getPages(notebookId);
    return pages.length > 0 ? pages[0] : null;
  };

  /**
   * Add a new page to a notebook
   */
  const addPage = (notebookId, pageName) => {
    const newAppData = { ...appData };
    const notebook = newAppData.notebooks.find(nb => nb.id === notebookId);

    if (notebook) {
      const newPage = {
        id: generateIdWithPrefix('pg'),
        name: pageName,
        order: notebook.pages.length,
        stickies: []
      };
      notebook.pages.push(newPage);
      setAppData(newAppData);
      saveAppData(newAppData);
      return newPage;
    }
    return null;
  };

  /**
   * Update page name
   */
  const updatePageName = (notebookId, pageId, newName) => {
    const newAppData = { ...appData };
    const notebook = newAppData.notebooks.find(nb => nb.id === notebookId);

    if (notebook) {
      const page = notebook.pages.find(pg => pg.id === pageId);
      if (page) {
        page.name = newName;
        setAppData(newAppData);
        saveAppData(newAppData);
      }
    }
  };

  /**
   * Delete page
   */
  const deletePage = (notebookId, pageId) => {
    const newAppData = { ...appData };
    const notebook = newAppData.notebooks.find(nb => nb.id === notebookId);

    if (notebook) {
      notebook.pages = notebook.pages.filter(pg => pg.id !== pageId);
      setAppData(newAppData);
      saveAppData(newAppData);
    }
  };

  // ============================================
  // STICKY OPERATIONS
  // ============================================

  /**
   * Get sticky by ID (searches all notebooks/pages)
   */
  const getStickyById = (stickyId) => {
    for (const notebook of appData?.notebooks || []) {
      for (const page of notebook.pages || []) {
        const sticky = page.stickies.find(st => st.id === stickyId);
        if (sticky) return sticky;
      }
    }
    return null;
  };

  /**
   * Get all stickies for a page
   */
  const getStickiesByPage = (notebookId, pageId) => {
    const page = getPageById(notebookId, pageId);
    return page?.stickies || [];
  };

  /**
   * Add a new sticky
   */
  const addSticky = (notebookId, pageId, content) => {
    const newAppData = { ...appData };
    const notebook = newAppData.notebooks.find(nb => nb.id === notebookId);

    if (notebook) {
      const page = notebook.pages.find(pg => pg.id === pageId);
      if (page) {
        const newStickyNumber = newAppData.lastStickyNumber + 1;
        const newSticky = {
          id: generateIdWithPrefix('st'),
          sequentialNumber: newStickyNumber,
          content,
          createdAt: new Date().toISOString(),
          status: STICKY_STATUS.ACTIVE
        };
        page.stickies.push(newSticky);
        newAppData.lastStickyNumber = newStickyNumber;
        setAppData(newAppData);
        saveAppData(newAppData);
        return newSticky;
      }
    }
    return null;
  };

  /**
   * Update sticky content
   */
  const updateSticky = (stickyId, content) => {
    const newAppData = { ...appData };
    let updated = false;

    for (const notebook of newAppData.notebooks || []) {
      for (const page of notebook.pages || []) {
        const sticky = page.stickies.find(st => st.id === stickyId);
        if (sticky) {
          sticky.content = content;
          updated = true;
          break;
        }
      }
      if (updated) break;
    }

    if (updated) {
      setAppData(newAppData);
      saveAppData(newAppData);
    }
  };

  /**
   * Delete sticky
   */
  const deleteSticky = (stickyId) => {
    const newAppData = { ...appData };
    let deleted = false;

    for (const notebook of newAppData.notebooks || []) {
      for (const page of notebook.pages || []) {
        const index = page.stickies.findIndex(st => st.id === stickyId);
        if (index !== -1) {
          page.stickies.splice(index, 1);
          deleted = true;
          break;
        }
      }
      if (deleted) break;
    }

    if (deleted) {
      setAppData(newAppData);
      saveAppData(newAppData);
    }
  };

  /**
   * Move sticky to another notebook/page
   */
  const moveSticky = (stickyId, targetNotebookId, targetPageId) => {
    const newAppData = { ...appData };
    let sticky = null;

    // Find and remove from current location
    for (const notebook of newAppData.notebooks || []) {
      for (const page of notebook.pages || []) {
        const index = page.stickies.findIndex(st => st.id === stickyId);
        if (index !== -1) {
          [sticky] = page.stickies.splice(index, 1);
          break;
        }
      }
    }

    // Add to target location
    if (sticky) {
      const targetNotebook = newAppData.notebooks.find(
        nb => nb.id === targetNotebookId
      );
      if (targetNotebook) {
        const targetPage = targetNotebook.pages.find(
          pg => pg.id === targetPageId
        );
        if (targetPage) {
          targetPage.stickies.push(sticky);
          setAppData(newAppData);
          saveAppData(newAppData);
        }
      }
    }
  };

  // ============================================
  // SETTINGS OPERATIONS
  // ============================================

  /**
   * Update display layout setting
   */
  const updateDisplayLayout = (layout) => {
    const newSettings = { ...settings, stickyDisplayLayout: layout };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const value = {
    // State
    appData,
    settings,
    loading,

    // Notebook operations
    getNotebooks,
    getNotebookById,
    updateNotebook,

    // Page operations
    getPages,
    getPageById,
    getDefaultPage,
    addPage,
    updatePageName,
    deletePage,

    // Sticky operations
    getStickyById,
    getStickiesByPage,
    addSticky,
    updateSticky,
    deleteSticky,
    moveSticky,

    // Settings operations
    updateDisplayLayout
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
