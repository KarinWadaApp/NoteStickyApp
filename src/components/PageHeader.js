import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PageHeader = ({ notebookName, onBack }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>◀</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{notebookName}</Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  backButton: {
    padding: 8
  },
  backText: {
    fontSize: 20,
    color: '#333'
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center'
  },
  placeholder: {
    width: 40
  }
});

export default PageHeader;
