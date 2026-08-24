import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { AppContext } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import PageTabs from '../components/PageTabs';
import DisplayModeSelector from '../components/DisplayModeSelector';
import StickyItem from '../components/StickyItem';
import ModalPageForm from '../components/ModalPageForm';
import { arrangeStickiesInGrid } from '../utils/stickyDisplayFormatter';

const NotebookScreen = ({ navigation, route }) => {
  const { notebookId, notebookName } = route.params;
  const { getNotebookById, getPages, getDefaultPage, getStickiesByPage, addPage, updateDisplayLayout, settings } = useContext(AppContext);

  const [activePageId, setActivePageId] = useState(null);
  const [showPageModal, setShowPageModal] = useState(false);

  // Initialize active page on mount
  React.useEffect(() => {
    const defaultPage = getDefaultPage(notebookId);
    if (defaultPage) {
      setActivePageId(defaultPage.id);
    }
  }, [notebookId]);

  const notebook = getNotebookById(notebookId);
  const pages = getPages(notebookId);
  const currentPage = pages.find(p => p.id === activePageId);
  const stickies = currentPage ? getStickiesByPage(notebookId, currentPage.id) : [];
  const grid = arrangeStickiesInGrid(stickies, settings?.stickyDisplayLayout);

  const handleAddPage = (pageName) => {
    addPage(notebookId, pageName);
    setShowPageModal(false);
  };

  const handleStickyPress = (sticky) => {
    navigation.navigate('StickyDetail', {
      stickyId: sticky.id,
      notebookId,
      pageId: activePageId
    });
  };

  const handleAddSticky = () => {
    navigation.navigate('StickyCreate', {
      notebookId,
      pageId: activePageId
    });
  };

  return (
    <View style={styles.container}>
      <PageHeader
        notebookName={notebookName}
        onBack={() => navigation.goBack()}
      />

      {pages.length > 0 && (
        <PageTabs
          pages={pages}
          activePageId={activePageId}
          onSelectPage={setActivePageId}
        />
      )}

      <DisplayModeSelector
        currentLayout={settings?.stickyDisplayLayout}
        onChangeLayout={updateDisplayLayout}
      />

      {/* Grid Display */}
      <View style={styles.gridContainer}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.gridRow}>
            {row.map((sticky, colIndex) => (
              <StickyItem
                key={`${rowIndex}-${colIndex}`}
                sticky={sticky}
                onPress={sticky ? () => handleStickyPress(sticky) : null}
              />
            ))}
          </View>
        ))}
      </View>

      {/* FAB - Add Sticky */}
      <TouchableOpacity style={styles.fab} onPress={handleAddSticky}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* FAB - Add Page */}
      <TouchableOpacity
        style={[styles.fab, styles.fabSecondary]}
        onPress={() => setShowPageModal(true)}
      >
        <Text style={styles.fabText}>📄</Text>
      </TouchableOpacity>

      <ModalPageForm
        visible={showPageModal}
        onClose={() => setShowPageModal(false)}
        onSubmit={handleAddPage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
  gridContainer: {
    flex: 1,
    padding: 8
  },
  gridRow: {
    flexDirection: 'row',
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
  fabSecondary: {
    bottom: 86,
    backgroundColor: '#666'
  },
  fabText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '600'
  }
});

export default NotebookScreen;
