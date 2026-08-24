import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { AppContext } from '../context/AppContext';
import PageHeader from '../components/PageHeader';

const StickyCreateScreen = ({ navigation, route }) => {
  const { notebookId, pageId } = route.params;
  const { addSticky, getDefaultPage } = useContext(AppContext);
  const [content, setContent] = useState('');

  const targetPageId = pageId || getDefaultPage(notebookId)?.id;

  const handleCreate = () => {
    if (content.trim()) {
      addSticky(notebookId, targetPageId, content);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <PageHeader
        notebookName="新しいふせん"
        onBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.label}>内容:</Text>
        <TextInput
          style={styles.input}
          placeholder="ふせんの内容を入力してください"
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={8}
          textAlignVertical="top"
          placeholderTextColor="#999"
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>キャンセル</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleCreate}
        >
          <Text style={styles.submitButtonText}>作成</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
  content: {
    flex: 1,
    padding: 16
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    minHeight: 200
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0'
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: '#E0E0E0'
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666'
  },
  submitButton: {
    backgroundColor: '#333'
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF'
  }
});

export default StickyCreateScreen;
