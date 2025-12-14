/**
 * Drawer Favorites Screen
 *
 * @description Favorites screen within drawer navigation example
 *
 * @ai-guide
 * This is an example favorites screen within the drawer navigator.
 *
 * CLEANUP: Remove this file when cleaning the project.
 */

import { View, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '@/design-system';
import { Text, Card, Icon, Button } from '@/components/ui';

interface FavoriteItem {
  id: string;
  title: string;
  description: string;
  icon: 'star' | 'bookmark' | 'heart' | 'folder';
  color: 'primary' | 'warning' | 'error' | 'info';
}

const MOCK_FAVORITES: FavoriteItem[] = [
  {
    id: '1',
    title: 'Project Alpha',
    description: 'Main development project for Q1',
    icon: 'star',
    color: 'warning',
  },
  {
    id: '2',
    title: 'Design Resources',
    description: 'Collection of UI/UX design files',
    icon: 'bookmark',
    color: 'primary',
  },
  {
    id: '3',
    title: 'Team Photos',
    description: 'Photos from team events',
    icon: 'heart',
    color: 'error',
  },
  {
    id: '4',
    title: 'Documentation',
    description: 'Technical documentation and guides',
    icon: 'folder',
    color: 'info',
  },
];

export default function DrawerFavoritesScreen() {
  const { theme } = useTheme();

  const renderFavorite = ({ item }: { item: FavoriteItem }) => (
    <Card pressable style={styles.favoriteCard}>
      <View style={styles.favoriteContent}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                theme.colors[`${item.color}Light` as keyof typeof theme.colors] ||
                theme.colors.surfaceSecondary,
            },
          ]}
        >
          <Icon name={item.icon} size="lg" color={item.color} />
        </View>
        <View style={styles.textContainer}>
          <Text variant="label">{item.title}</Text>
          <Text variant="bodySmall" color="textSecondary">
            {item.description}
          </Text>
        </View>
        <Icon name="chevron-forward" size="md" color="textTertiary" />
      </View>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={MOCK_FAVORITES}
        renderItem={renderFavorite}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Icon name="heart" size="xl" color="error" />
              <Text variant="h4" style={styles.headerTitle}>
                Your Favorites
              </Text>
            </View>
            <Text variant="body" color="textSecondary">
              {MOCK_FAVORITES.length} items saved
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="heart-outline" size={48} color="textTertiary" />
            <Text variant="body" color="textSecondary" style={styles.emptyText}>
              No favorites yet
            </Text>
            <Button variant="outline" size="sm">
              Browse Items
            </Button>
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerTitle: {
    marginLeft: 8,
  },
  favoriteCard: {
    padding: 12,
  },
  favoriteContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  separator: {
    height: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    marginTop: 12,
    marginBottom: 16,
  },
});
