import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DISPLAY_LAYOUTS } from '../utils/constants';

const DisplayModeSelector = ({ currentLayout, onChangeLayout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>表示順:</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.button,
            currentLayout === DISPLAY_LAYOUTS.HORIZONTAL &&
              styles.activeButton
          ]}
          onPress={() => onChangeLayout(DISPLAY_LAYOUTS.HORIZONTAL)}
        >
          <Text style={styles.buttonLabel}>左→右</Text>
          <Text style={styles.preview}>1 2</Text>
          <Text style={styles.preview}>3 4</Text>
          <Text style={styles.preview}>5 6</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            currentLayout === DISPLAY_LAYOUTS.VERTICAL && styles.activeButton
          ]}
          onPress={() => onChangeLayout(DISPLAY_LAYOUTS.VERTICAL)}
        >
          <Text style={styles.buttonLabel}>上→下</Text>
          <Text style={styles.preview}>1 4</Text>
          <Text style={styles.preview}>2 5</Text>
          <Text style={styles.preview}>3 6</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8
  },
  button: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    padding: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center'
  },
  activeButton: {
    borderColor: '#333',
    backgroundColor: '#F0F0F0'
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  preview: {
    fontSize: 10,
    color: '#666',
    lineHeight: 12
  }
});

export default DisplayModeSelector;
