import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { AppContext } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import { formatDate } from '../utils/helpers';

const StickyDetailScreen = ({ navigation, route }) => {
  const { stickyId, notebookId, pageId } = route.params;
  const { getStickyById, updateSticky, deleteSticky } = useContext(AppContext);
  const sticky = getStickyById(stickyId);
  const [content, setContent] = useState(sticky?.content || '');

  const handleUpdate = () => {
    if (content.trim()) {
      updateSticky(stickyId, content);
      navigation.goBack();
    }
  };

  const handleDelete = () => {
    Alert.alert(
      '削除確認',
      'このふせんを削除してもよろしいですか?',
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '削除',
          onPress: () => {
            deleteSticky(stickyId);
            navigation.goBack();
          },
          style: 'destructive'
        }
      ]
    );
  };

  if (!sticky) {
    return (
      <View style={styles.container}>
        <PageHeader
          notebookName="ふせんが見つかりません"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>ふせんが見つかりません</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PageHeader
        notebookName="ふせん詳細"
        onBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.content}>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>作成日時:</Text>
          <Text style={styles.infoValue}>{formatDate(sticky.createdAt)}</Text>
        </View>

        <Text style={styles.label}>内容:</Text>
        <TextInput
          style={styles.input}
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={10}
          textAlignVertical="top"
          placeholderTextColor="#999"
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>削除</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>キャンセル</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleUpdate}
        >
          <Text style={styles.submitButtonText}>更新</Text>
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
  infoSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4
  },
  infoValue: {
    fontSize: 14,
    color: '#333'
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
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notFoundText: {
    fontSize: 16,
    color: '#999'
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
  deleteButton: {
    backgroundColor: '#FF6B6B'
  },
  deleteButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  cancelButton: {
    backgroundColor: '#E0E0E0'
  },
  cancelButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666'
  },
  submitButton: {
    backgroundColor: '#333'
  },
  submitButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF'
  }
});

export default StickyDetailScreen;
