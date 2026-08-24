import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { truncateText } from '../utils/helpers';

const StickyItem = ({ sticky, onPress }) => {
  if (!sticky) {
    // Empty placeholder
    return <View style={styles.emptyPlaceholder} />;
  }

  return (
    <TouchableOpacity style={styles.sticky} onPress={onPress}>
      <Text style={styles.content} numberOfLines={3}>
        {sticky.content}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sticky: {
    flex: 1,
    backgroundColor: '#FFEB3B',
    borderRadius: 8,
    padding: 12,
    margin: 8,
    minHeight: 80,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3
  },
  emptyPlaceholder: {
    flex: 1,
    margin: 8,
    minHeight: 80,
    backgroundColor: 'transparent'
  },
  content: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500'
  }
});

export default StickyItem;
