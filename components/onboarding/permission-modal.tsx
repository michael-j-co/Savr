import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PermissionModalProps {
  visible: boolean;
  appName: string;
  onYes: () => void;
  onNo: () => void;
}

/**
 * Modal for requesting permission to intervene when user opens a delivery app
 * Displays after user selects their primary delivery app
 */
export function PermissionModal({
  visible,
  appName,
  onYes,
  onNo,
}: PermissionModalProps) {
  const buttonColor = useThemeColor({}, 'buttonPrimary');
  const buttonTextColor = useThemeColor({}, 'buttonText');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onNo}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Question */}
          <Text style={styles.question}>
            Do you give us permission to intervene when you open{' '}
            <Text style={styles.appName}>{appName}</Text> in the future?
          </Text>

          {/* Yes Button */}
          <TouchableOpacity
            style={[styles.yesButton, { backgroundColor: buttonColor }]}
            onPress={onYes}
            activeOpacity={0.8}
          >
            <Text style={[styles.yesButtonText, { color: buttonTextColor }]}>
              Yes
            </Text>
          </TouchableOpacity>

          {/* No Link */}
          <TouchableOpacity onPress={onNo} activeOpacity={0.7}>
            <Text style={styles.noText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    // Shadow for elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 28,
  },
  appName: {
    color: '#789F80',
    fontWeight: 'bold',
  },
  yesButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 48,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  yesButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  noText: {
    fontSize: 14,
    color: '#666666',
    textDecorationLine: 'underline',
  },
});
