import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import Header from '@components/Header';
import Button from '@components/Button';
import SettingItem from '@components/SettingItem';
import { useAuth } from '@hooks/useAuth';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  const handleSettingPress = useCallback((title: string) => {
    Toast.show({
      type: 'info',
      text1: title,
      text2: `${title} screen is under development.`,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Card Section */}
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
            }}
            style={styles.avatar}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.name}>{user?.name ?? 'User Name'}</Text>
            <Text style={styles.email}>{user?.email ?? 'user@example.com'}</Text>
          </View>
        </View>

        {/* Account Settings Section */}
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.sectionCard}>
          <SettingItem
            icon="person-outline"
            title="Personal Info"
            subtitle="Name, email, and security info"
            onPress={() => handleSettingPress('Personal Info')}
          />
          <View style={styles.divider} />
          <SettingItem
            icon="cart-outline"
            title="My Orders"
            subtitle="Track and view past orders"
            onPress={() => handleSettingPress('My Orders')}
          />
          <View style={styles.divider} />
          <SettingItem
            icon="heart-outline"
            title="Wishlist"
            subtitle="Items you have saved"
            onPress={() => handleSettingPress('Wishlist')}
          />
        </View>

        {/* General Settings Section */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.sectionCard}>
          <SettingItem
            icon="notifications-outline"
            title="Notifications"
            subtitle="Push and email notification settings"
            onPress={() => handleSettingPress('Notifications')}
          />
          <View style={styles.divider} />
          <SettingItem
            icon="shield-checkmark-outline"
            title="Privacy & Security"
            subtitle="Password reset and security check"
            onPress={() => handleSettingPress('Privacy & Security')}
          />
          <View style={styles.divider} />
          <SettingItem
            icon="help-circle-outline"
            title="Help & Support"
            subtitle="FAQS, live chat, and support tickets"
            onPress={() => handleSettingPress('Help & Support')}
          />
        </View>

        {/* Logout Button */}
        <Button title="Logout" variant="outline" onPress={logout} style={styles.logoutBtn} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.border,
    borderRadius: 32,
    height: 64,
    marginRight: spacing.md,
    width: 64,
  },
  container: { backgroundColor: colors.background, flex: 1 },
  divider: {
    backgroundColor: colors.border,
    height: 1,
    marginLeft: 64,
  },
  email: { color: colors.textSecondary, fontSize: 13, marginTop: 2 },
  logoutBtn: { marginTop: spacing.sm },
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  profileDetails: {
    flex: 1,
  },
  scrollContent: { padding: spacing.md, paddingBottom: spacing.xl },
  sectionCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: spacing.xs + 4, // 8px
    marginLeft: 4,
    textTransform: 'uppercase',
  },
});

export default ProfileScreen;
