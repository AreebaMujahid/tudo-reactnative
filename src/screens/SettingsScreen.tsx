import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import Header from '@components/Header';
import LogoutConfirmModal from '@components/LogoutConfirmModal';
import { useLogoutConfirmation } from '@hooks/useLogoutConfirmation';
import { colors } from '@theme/colors';

const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const {
    isModalVisible,
    isLoggingOut,
    openLogoutConfirmation,
    closeLogoutConfirmation,
    confirmLogout,
  } = useLogoutConfirmation();

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
      <TouchableOpacity style={styles.row} onPress={openLogoutConfirmation}>
        <Text style={[styles.label, styles.danger]}>Logout</Text>
      </TouchableOpacity>

      <LogoutConfirmModal
        visible={isModalVisible}
        loading={isLoggingOut}
        onConfirm={confirmLogout}
        onCancel={closeLogoutConfirmation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, flex: 1 },
  danger: { color: colors.error },
  label: { color: colors.text, fontSize: 16 },
  row: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
});

export default SettingsScreen;
