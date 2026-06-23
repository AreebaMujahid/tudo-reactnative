import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '@components/Header';
import Button from '@components/Button';
import { useAuth } from '@hooks/useAuth';
import { colors } from '@theme/colors';

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <View style={styles.content}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.charAt(0)?.toUpperCase() ?? 'U'}</Text>
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Button title="Logout" variant="outline" onPress={logout} style={styles.logoutBtn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, alignItems: 'center' },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: { fontSize: 32, color: colors.white, fontWeight: '700' },
  name: { fontSize: 22, fontWeight: '600', color: colors.text },
  email: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  logoutBtn: { marginTop: 32, alignSelf: 'stretch' },
});

export default ProfileScreen;
