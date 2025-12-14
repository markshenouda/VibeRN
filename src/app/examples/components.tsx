/**
 * Components Example Screen
 *
 * @description Showcase of UI components
 *
 * @ai-guide
 * This is an EXAMPLE screen showing all UI components.
 *
 * CLEANUP: Remove this file when cleaning the project.
 */

import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useTheme } from '@/design-system';
import {
  Text,
  Button,
  Card,
  Avatar,
  Badge,
  Input,
  Checkbox,
  Switch,
  RadioGroup,
  Skeleton,
  SkeletonText,
  Divider,
  Modal,
  useToast,
} from '@/components/ui';
import { Header } from '@/components/patterns';

export default function ComponentsScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { show } = useToast();

  const [checked, setChecked] = useState(false);
  const [switched, setSwitched] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [basicModalVisible, setBasicModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [fullModalVisible, setFullModalVisible] = useState(false);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
    >
      <Header
        title="Components"
        showBack
        onBack={() => router.back()}
        style={{ paddingTop: insets.top }}
      />

      <View style={styles.content}>
        {/* Buttons */}
        <Section title="Buttons">
          <View style={styles.row}>
            <Button size="sm">Small</Button>
            <Button>Medium</Button>
            <Button size="lg">Large</Button>
          </View>
          <View style={styles.row}>
            <Button variant="solid">Solid</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="soft">Soft</Button>
          </View>
          <View style={styles.row}>
            <Button color="success">Success</Button>
            <Button color="warning">Warning</Button>
            <Button color="error">Error</Button>
          </View>
          <Button loading>Loading</Button>
        </Section>

        <Divider spacing={16} />

        {/* Typography */}
        <Section title="Typography">
          <Text variant="h1">Heading 1</Text>
          <Text variant="h2">Heading 2</Text>
          <Text variant="h3">Heading 3</Text>
          <Text variant="h4">Heading 4</Text>
          <Text variant="body">Body text - The quick brown fox jumps over the lazy dog.</Text>
          <Text variant="bodySmall" color="textSecondary">
            Body small - Secondary text color
          </Text>
          <Text variant="caption" color="textTertiary">
            Caption text
          </Text>
        </Section>

        <Divider spacing={16} />

        {/* Cards */}
        <Section title="Cards">
          <Card variant="elevated" padding="md">
            <Text variant="h5">Elevated Card</Text>
            <Text variant="bodySmall" color="textSecondary">
              With shadow
            </Text>
          </Card>
          <Card variant="outlined" padding="md">
            <Text variant="h5">Outlined Card</Text>
            <Text variant="bodySmall" color="textSecondary">
              With border
            </Text>
          </Card>
          <Card variant="filled" padding="md">
            <Text variant="h5">Filled Card</Text>
            <Text variant="bodySmall" color="textSecondary">
              With background
            </Text>
          </Card>
        </Section>

        <Divider spacing={16} />

        {/* Avatar & Badge */}
        <Section title="Avatar & Badge">
          <View style={styles.row}>
            <Avatar name="John Doe" size="xs" />
            <Avatar name="Jane Smith" size="sm" />
            <Avatar name="Bob" size="md" />
            <Avatar name="Alice" size="lg" />
            <Avatar name="Charlie" size="xl" />
          </View>
          <View style={styles.row}>
            <Badge>Default</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="error">Error</Badge>
            <Badge color="info">Info</Badge>
          </View>
          <View style={styles.row}>
            <Badge variant="solid" color="primary">
              Solid
            </Badge>
            <Badge variant="soft" color="primary">
              Soft
            </Badge>
            <Badge variant="outline" color="primary">
              Outline
            </Badge>
          </View>
        </Section>

        <Divider spacing={16} />

        {/* Input */}
        <Section title="Input">
          <Input label="Default" placeholder="Enter text..." />
          <Input label="With error" placeholder="Enter text..." error="This field is required" />
          <Input label="With hint" placeholder="Enter text..." hint="This is a helpful hint" />
          <Input label="Disabled" placeholder="Disabled input" disabled />
        </Section>

        <Divider spacing={16} />

        {/* Form Controls */}
        <Section title="Form Controls">
          <Checkbox checked={checked} onCheckedChange={setChecked} label="Checkbox option" />
          <Switch value={switched} onValueChange={setSwitched} label="Switch option" />
          <RadioGroup
            value={radioValue}
            onValueChange={setRadioValue}
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
              { value: 'option3', label: 'Option 3' },
            ]}
          />
        </Section>

        <Divider spacing={16} />

        {/* Skeleton */}
        <Section title="Skeleton">
          <Skeleton width={200} height={20} />
          <Skeleton width="100%" height={100} variant="rectangular" />
          <View style={styles.row}>
            <Skeleton variant="circular" width={48} height={48} />
            <View style={{ flex: 1 }}>
              <SkeletonText lines={2} />
            </View>
          </View>
        </Section>

        <Divider spacing={16} />

        {/* Toast */}
        <Section title="Toast">
          <View style={styles.row}>
            <Button
              size="sm"
              color="success"
              onPress={() => show({ message: 'Success message!', type: 'success' })}
            >
              Success
            </Button>
            <Button
              size="sm"
              color="error"
              onPress={() => show({ message: 'Error message!', type: 'error' })}
            >
              Error
            </Button>
            <Button
              size="sm"
              color="warning"
              onPress={() => show({ message: 'Warning message!', type: 'warning' })}
            >
              Warning
            </Button>
            <Button
              size="sm"
              variant="soft"
              onPress={() => show({ message: 'Info message!', type: 'info' })}
            >
              Info
            </Button>
          </View>
        </Section>

        <Divider spacing={16} />

        {/* Modal */}
        <Section title="Modal">
          <View style={styles.row}>
            <Button size="sm" onPress={() => setBasicModalVisible(true)}>
              Basic Modal
            </Button>
            <Button size="sm" variant="outline" onPress={() => setConfirmModalVisible(true)}>
              Confirm Dialog
            </Button>
            <Button size="sm" variant="soft" onPress={() => setFullModalVisible(true)}>
              Full Screen
            </Button>
          </View>
        </Section>

        {/* Basic Modal */}
        <Modal
          visible={basicModalVisible}
          onClose={() => setBasicModalVisible(false)}
          title="Basic Modal"
          size="md"
        >
          <Text variant="body" style={{ marginBottom: 16 }}>
            This is a basic modal with a title and close button. Tap outside or press the close
            button to dismiss.
          </Text>
          <Button onPress={() => setBasicModalVisible(false)}>Close</Button>
        </Modal>

        {/* Confirmation Modal */}
        <Modal
          visible={confirmModalVisible}
          onClose={() => setConfirmModalVisible(false)}
          title="Delete Item?"
          size="sm"
          closeOnBackdrop={false}
        >
          <Text variant="body" style={{ marginBottom: 16 }}>
            Are you sure you want to delete this item? This action cannot be undone.
          </Text>
          <View style={styles.row}>
            <Button
              variant="outline"
              onPress={() => setConfirmModalVisible(false)}
              style={{ flex: 1 }}
            >
              Cancel
            </Button>
            <Button
              color="error"
              style={{ flex: 1 }}
              onPress={() => {
                setConfirmModalVisible(false);
                show({ message: 'Item deleted!', type: 'success' });
              }}
            >
              Delete
            </Button>
          </View>
        </Modal>

        {/* Full Screen Modal */}
        <Modal
          visible={fullModalVisible}
          onClose={() => setFullModalVisible(false)}
          title="Full Screen Modal"
          size="full"
        >
          <Text variant="body" style={{ marginBottom: 16 }}>
            This is a full screen modal. It takes up the entire screen and is useful for complex
            content like forms or detailed views.
          </Text>
          <Button onPress={() => setFullModalVisible(false)}>Close</Button>
        </Modal>
      </View>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="h4" style={styles.sectionTitle}>
        {title}
      </Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  sectionContent: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
});
