import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import Header from '@components/Header';
import Modal from '@components/Modal';
import Button from '@components/Button';
import { useAuth } from '@hooks/useAuth';
import { colors } from '@theme/colors';

const SettingsScreen = () => {
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <View style={styles.container}>
      <Header title="Settings" />
      <View style={styles.row}>
        <Text style={styles.label}>Push Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ true: colors.primary }}
        />
      </View>
      <TouchableOpacity style={styles.row} onPress={() => setShowLogoutModal(true)}>
        <Text style={[styles.label, styles.danger]}>Logout</Text>
      </TouchableOpacity>

      <Modal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirm Logout"
      >
        <Text style={styles.modalText}>Are you sure you want to logout?</Text>
        <Button
          title="Yes, Logout"
          onPress={() => {
            setShowLogoutModal(false);
            logout();
          }}
        />
        <Button
          title="Cancel"
          variant="outline"
          onPress={() => setShowLogoutModal(false)}
          style={styles.mt}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: { fontSize: 16, color: colors.text },
  danger: { color: colors.error },
  modalText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  mt: { marginTop: 8 },
});

export default SettingsScreen;
