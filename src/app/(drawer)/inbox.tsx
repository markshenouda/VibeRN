/**
 * Drawer Inbox Screen
 *
 * @description Inbox screen within drawer navigation example
 *
 * @ai-guide
 * This is an example inbox screen within the drawer navigator.
 *
 * CLEANUP: Remove this file when cleaning the project.
 */

import { View, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '@/design-system';
import { Text, Card, Icon, Badge } from '@/components/ui';

interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'John Doe',
    subject: 'Project Update',
    preview: 'Hey, just wanted to give you a quick update on the project status...',
    time: '2m ago',
    unread: true,
  },
  {
    id: '2',
    sender: 'Jane Smith',
    subject: 'Meeting Tomorrow',
    preview: 'Can we reschedule our meeting to 3 PM? I have a conflict...',
    time: '1h ago',
    unread: true,
  },
  {
    id: '3',
    sender: 'Team Notifications',
    subject: 'Weekly Report',
    preview: 'Your weekly productivity report is ready to view...',
    time: '3h ago',
    unread: false,
  },
  {
    id: '4',
    sender: 'Support',
    subject: 'Ticket Resolved',
    preview: 'Your support ticket #1234 has been resolved. Please let us know...',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: '5',
    sender: 'Newsletter',
    subject: 'This Week in Tech',
    preview: 'Top stories: AI developments, new frameworks, and more...',
    time: '2d ago',
    unread: false,
  },
];

export default function DrawerInboxScreen() {
  const { theme } = useTheme();

  const renderMessage = ({ item }: { item: Message }) => (
    <Card
      pressable
      style={[styles.messageCard, item.unread && { backgroundColor: theme.colors.primaryLight }]}
    >
      <View style={styles.messageHeader}>
        <View style={styles.senderContainer}>
          <Text variant="label" numberOfLines={1}>
            {item.sender}
          </Text>
          {item.unread && <Badge size="sm" variant="solid" color="primary" />}
        </View>
        <Text variant="caption" color="textTertiary">
          {item.time}
        </Text>
      </View>
      <Text variant="body" numberOfLines={1} style={styles.subject}>
        {item.subject}
      </Text>
      <Text variant="bodySmall" color="textSecondary" numberOfLines={2}>
        {item.preview}
      </Text>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={MOCK_MESSAGES}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Icon name="mail" size="lg" color="primary" />
            <Text variant="body" color="textSecondary" style={styles.headerText}>
              {MOCK_MESSAGES.filter((m) => m.unread).length} unread messages
            </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    marginLeft: 8,
  },
  messageCard: {
    padding: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  subject: {
    marginBottom: 4,
  },
  separator: {
    height: 8,
  },
});
