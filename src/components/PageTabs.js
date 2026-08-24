import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const PageTabs = ({ pages, activePageId, onSelectPage }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {pages.map(page => (
        <TouchableOpacity
          key={page.id}
          style={[
            styles.tab,
            activePageId === page.id && styles.activeTab
          ]}
          onPress={() => onSelectPage(page.id)}
        >
          <Text
            style={[
              styles.tabText,
              activePageId === page.id && styles.activeTabText
            ]}
          >
            {page.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 16,
    backgroundColor: '#E0E0E0'
  },
  activeTab: {
    backgroundColor: '#333'
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500'
  },
  activeTabText: {
    color: '#FFFFFF'
  }
});

export default PageTabs;
