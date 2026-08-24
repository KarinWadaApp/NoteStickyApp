import { DISPLAY_LAYOUTS, GRID_CONFIG } from './constants';

/**
 * Arrange stickies in a 2 columns x 3 rows grid
 * Based on sequentialNumber order (ascending)
 * 
 * HORIZONTAL: Left→Right→Next row
 * VERTICAL: Top→Bottom→Next column
 * 
 * @param {Array} stickies - Array of stickies
 * @param {String} layout - HORIZONTAL | VERTICAL (default: VERTICAL)
 * @returns {Array<Array>} - 2D grid array (3 rows x 2 columns)
 * 
 * TODO: Support 7+ stickies layout in Phase 2
 */
export function arrangeStickiesInGrid(
  stickies,
  layout = DISPLAY_LAYOUTS.VERTICAL
) {
  // Sort by sequentialNumber (ascending)
  const sorted = [...stickies].sort(
    (a, b) => a.sequentialNumber - b.sequentialNumber
  );

  const { COLUMNS, ROWS } = GRID_CONFIG;
  const grid = Array(ROWS)
    .fill(null)
    .map(() => Array(COLUMNS).fill(null));

  if (layout === DISPLAY_LAYOUTS.HORIZONTAL) {
    // Left→Right→Next row
    // [1, 2]
    // [3, 4]
    // [5, 6]
    sorted.forEach((sticky, index) => {
      const row = Math.floor(index / COLUMNS);
      const col = index % COLUMNS;
      if (row < ROWS) {
        grid[row][col] = sticky;
      }
    });
  } else if (layout === DISPLAY_LAYOUTS.VERTICAL) {
    // Top→Bottom→Next column
    // [1, 4]
    // [2, 5]
    // [3, 6]
    sorted.forEach((sticky, index) => {
      const col = Math.floor(index / ROWS);
      const row = index % ROWS;
      if (col < COLUMNS) {
        grid[row][col] = sticky;
      }
    });
  }

  // TODO: Support 7+ stickies layout in Phase 2

  return grid;
}
