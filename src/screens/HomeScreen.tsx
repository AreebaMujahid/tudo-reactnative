import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import Header from '@components/Header';
import Loader from '@components/Loader';
import EmptyState from '@components/EmptyState';
import { useAuth } from '@hooks/useAuth';
import { colors } from '@theme/colors';

interface FeedItem {
  id: string;
  title: string;
}

const fetchFeed = async (): Promise<FeedItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return [
    { id: '1', title: 'Welcome to ProductionApp' },
    { id: '2', title: 'Your feed is ready' },
    { id: '3', title: 'Pull down to refresh' },
  ];
};

const HomeScreen = () => {
  const { user } = useAuth();
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['feed'],
    queryFn: fetchFeed,
  });

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Failed to load"
        message="Something went wrong"
        onAction={refetch}
        actionLabel="Retry"
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header title={`Hello, ${user?.name ?? 'User'}`} subtitle="Home" />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        refreshing={isFetching}
        onRefresh={refetch}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState title="No items" message="Your feed is empty" />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { paddingBottom: 24 },
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardText: { fontSize: 16, color: colors.text },
});

export default HomeScreen;
