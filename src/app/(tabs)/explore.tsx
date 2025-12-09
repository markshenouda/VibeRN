/**
 * Explore Screen
 *
 * @description Example explore/search tab
 *
 * @ai-guide
 * This is an EXAMPLE screen demonstrating:
 * - List with search functionality
 * - Pull-to-refresh
 * - Empty state
 * - Loading states
 *
 * CLEANUP: Replace with your own explore/search screen.
 */

import { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/design-system';
import { Text, Card, Badge } from '@/components/ui';
import { SearchBar, EmptyState, Header } from '@/components/patterns';
import { useRefreshControl, useDebounce } from '@/hooks';
import { sleep } from '@/lib/utils';

// Example data
const ITEMS = [
  {
    id: '1',
    title: 'Getting Started',
    category: 'Guide',
    description: 'Learn the basics of VibeRN',
  },
  { id: '2', title: 'Design System', category: 'Components', description: 'Explore UI components' },
  {
    id: '3',
    title: 'Form Handling',
    category: 'Guide',
    description: 'Build forms with validation',
  },
  { id: '4', title: 'Navigation', category: 'Guide', description: 'Learn about routing' },
  { id: '5', title: 'State Management', category: 'Advanced', description: 'Manage app state' },
  { id: '6', title: 'API Integration', category: 'Advanced', description: 'Connect to backends' },
  { id: '7', title: 'Authentication', category: 'Guide', description: 'Implement auth flows' },
  { id: '8', title: 'Theming', category: 'Components', description: 'Customize the look' },
];

type Item = (typeof ITEMS)[number];

export default function ExploreScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search query
  const debouncedQuery = useDebounce(query, 300);

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!debouncedQuery) return ITEMS;
    const lowerQuery = debouncedQuery.toLowerCase();
    return ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery)
    );
  }, [debouncedQuery]);

  // Pull to refresh
  const { refreshControl } = useRefreshControl(async () => {
    setIsLoading(true);
    await sleep(1000); // Simulate API call
    setIsLoading(false);
  });

  // Render item
  const renderItem = ({ item }: { item: Item }) => (
    <Card pressable onPress={() => router.push(`/details/${item.id}`)} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text variant="h5">{item.title}</Text>
        <Badge variant="soft" color="primary" size="sm">
          {item.category}
        </Badge>
      </View>
      <Text variant="bodySmall" color="textSecondary">
        {item.description}
      </Text>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Explore" large style={{ paddingTop: insets.top }} />

      {/* Search */}
      <View style={styles.searchContainer}>
        <SearchBar value={query} onChangeText={setQuery} placeholder="Search topics..." />
      </View>

      {/* List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={refreshControl}
        ListEmptyComponent={
          <EmptyState title="No results found" description={`No items match "${debouncedQuery}"`} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  list: {
    padding: 16,
    paddingTop: 4,
  },
  card: {
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
});
