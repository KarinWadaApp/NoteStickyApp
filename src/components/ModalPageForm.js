import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity
} from 'react-native';

const ModalPageForm = ({ visible, onClose, onSubmit, existingPageName }) => {
  const [pageName, setPageName] = useState(existingPageName || '');

  const handleSubmit = () => {
    if (pageName.trim()) {
      onSubmit(pageName);
      setPageName('');
    }
  };

  const handleClose = () => {
    setPageName('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {existingPageName ? 'ページ名を変更' : 'ページを追加'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="ページ名を入力"
            value={pageName}
            onChangeText={setPageName}
            placeholderTextColor="#999"
          />

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>キャンセル</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>
                {existingPageName ? '変更' : '作成'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
    color: '#333'
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8
  },
  button: {
    flex: 1,
    paddingVertical: 10,
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

export default ModalPageForm;
