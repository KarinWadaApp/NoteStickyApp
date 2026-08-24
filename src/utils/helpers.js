import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

/**
 * Generate a unique ID
 */
export function generateId() {
  return uuidv4();
}

/**
 * Generate a unique ID with prefix
 */
export function generateIdWithPrefix(prefix) {
  return `${prefix}-${uuidv4().slice(0, 8)}`;
}

/**
 * Format date for display
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Truncate text
 */
export function truncateText(text, length = 50) {
  return text.length > length ? text.slice(0, length) + '...' : text;
}
