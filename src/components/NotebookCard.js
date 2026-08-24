import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NotebookCard = ({ notebook, onPress }) => {
  const getEmoji = (type) => {
    const emojis = {
      inbox: '📘',
      today: '📗',
      database: '📙',
      done: '📕',
      abandoned: '📓'
    };
    return emojis[type] || '📕';
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.emoji}>{getEmoji(notebook.type)}</Text>
      <Text style={styles.name}>{notebook.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  emoji: {
    fontSize: 28,
    marginRight: 12
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  }
});

export default NotebookCard;
