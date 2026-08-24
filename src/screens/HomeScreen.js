import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AppContext } from '../context/AppContext';
import NotebookCard from '../components/NotebookCard';

const HomeScreen = ({ navigation }) => {
  const { getNotebooks } = useContext(AppContext);
  const notebooks = getNotebooks();

  const handleNotebookPress = (notebook) => {
    navigation.navigate('Notebook', {
      notebookId: notebook.id,
      notebookName: notebook.name
    });
  };

  const handleFABPress = () => {
    navigation.navigate('StickyCreate', {
      notebookId: null,
      pageId: null
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>NoteStickyApp</Text>
      </View>

      <ScrollView style={styles.content}>
        {notebooks.map(notebook => (
          <NotebookCard
            key={notebook.id}
            notebook={notebook}
            onPress={() => handleNotebookPress(notebook)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={handleFABPress}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333'
  },
  content: {
    flex: 1
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  fabText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '600'
  }
});

export default HomeScreen;
