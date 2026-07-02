import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Modal from '@components/Modal';
import Button from '@components/Button';
import { colors } from '@theme/colors';

type LogoutConfirmModalProps = {
  visible: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  visible,
  loading = false,
  onConfirm,
  onCancel,
}) => (
  <Modal visible={visible} onClose={onCancel} title="Confirm Logout">
    <Text style={styles.message}>
      You will be signed out and your session data will be removed from this device.
    </Text>
    <Button title="Yes, Logout" loading={loading} onPress={onConfirm} />
    <Button
      title="Cancel"
      variant="outline"
      disabled={loading}
      onPress={onCancel}
      style={styles.cancelButton}
    />
  </Modal>
);

const styles = StyleSheet.create({
  cancelButton: {
    marginTop: 8,
  },
  message: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default LogoutConfirmModal;
