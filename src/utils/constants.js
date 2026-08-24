// Notebook types
export const NOTEBOOK_TYPES = {
  INBOX: 'inbox',
  TODAY: 'today',
  DATABASE: 'database',
  DONE: 'done',
  ABANDONED: 'abandoned'
};

// Display layout modes
export const DISPLAY_LAYOUTS = {
  HORIZONTAL: 'horizontal', // Left→Right→Next row (1 2 / 3 4 / 5 6)
  VERTICAL: 'vertical'      // Top→Bottom→Next column (1 4 / 2 5 / 3 6)
};

// Sticky status
export const STICKY_STATUS = {
  ACTIVE: 'active',
  DONE: 'done',
  ARCHIVED: 'archived'
};

// Default notebooks configuration
export const DEFAULT_NOTEBOOKS = [
  {
    id: 'nb-inbox',
    type: NOTEBOOK_TYPES.INBOX,
    name: '①インボックス',
    order: 0
  },
  {
    id: 'nb-today',
    type: NOTEBOOK_TYPES.TODAY,
    name: '②今日のタスク',
    order: 1
  },
  {
    id: 'nb-database',
    type: NOTEBOOK_TYPES.DATABASE,
    name: '③データベース',
    order: 2
  },
  {
    id: 'nb-done',
    type: NOTEBOOK_TYPES.DONE,
    name: '④DONE',
    order: 3
  },
  {
    id: 'nb-abandoned',
    type: NOTEBOOK_TYPES.ABANDONED,
    name: '⑤諦め',
    order: 4
  }
];

// Grid configuration
export const GRID_CONFIG = {
  COLUMNS: 2,
  ROWS: 3,
  MAX_STICKIES: 6 // TODO: Support 7+ stickies in Phase 2
};
