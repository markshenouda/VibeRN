/**
 * Forms Example Screen
 *
 * @description Showcase of form handling
 *
 * @ai-guide
 * This is an EXAMPLE screen showing form patterns.
 *
 * CLEANUP: Remove this file when cleaning the project.
 */

import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTheme } from '@/design-system';
import { Text, Button, Card, Divider, useToast } from '@/components/ui';
import {
  FormInput,
  FormSelect,
  FormCheckbox,
  FormRadioGroup,
  FormSwitch,
  emailSchema,
  requiredString,
  phoneSchema,
} from '@/components/forms';
import { Header } from '@/components/patterns';
import { sleep } from '@/lib/utils';

// Example form schema
const exampleFormSchema = z.object({
  name: requiredString.min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  phone: phoneSchema.optional().or(z.literal('')),
  country: requiredString,
  plan: requiredString,
  newsletter: z.boolean(),
  terms: z.boolean().refine((val) => val, 'You must accept the terms'),
});

type ExampleFormData = z.infer<typeof exampleFormSchema>;

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
];

export default function FormsScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { show } = useToast();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ExampleFormData>({
    resolver: zodResolver(exampleFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      country: '',
      plan: 'free',
      newsletter: false,
      terms: false,
    },
  });

  const onSubmit = async (data: ExampleFormData) => {
    try {
      await sleep(1500);
      console.log('Form data:', data);
      show({ message: 'Form submitted successfully!', type: 'success' });
    } catch (error) {
      show({ message: 'Submission failed', type: 'error' });
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      keyboardShouldPersistTaps="handled"
    >
      <Header
        title="Form Examples"
        showBack
        onBack={() => router.back()}
        style={{ paddingTop: insets.top }}
      />

      <View style={styles.content}>
        <Card variant="elevated" padding="lg">
          <Text variant="h4" style={styles.formTitle}>
            Complete Form Example
          </Text>
          <Text variant="bodySmall" color="textSecondary" style={styles.formSubtitle}>
            Demonstrates all form components with validation
          </Text>

          <Divider spacing={16} />

          {/* Text Inputs */}
          <FormInput name="name" control={control} label="Full Name" placeholder="John Doe" />

          <FormInput
            name="email"
            control={control}
            label="Email"
            placeholder="john@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FormInput
            name="phone"
            control={control}
            label="Phone (Optional)"
            placeholder="+1 (555) 000-0000"
            keyboardType="phone-pad"
          />

          {/* Select */}
          <FormSelect
            name="country"
            control={control}
            label="Country"
            placeholder="Select your country"
            options={countries}
          />

          {/* Radio Group */}
          <FormRadioGroup
            name="plan"
            control={control}
            label="Select Plan"
            options={[
              { value: 'free', label: 'Free - $0/month' },
              { value: 'pro', label: 'Pro - $9.99/month' },
              { value: 'enterprise', label: 'Enterprise - Contact us' },
            ]}
          />

          {/* Switches & Checkboxes */}
          <FormSwitch name="newsletter" control={control} label="Subscribe to newsletter" />

          <FormCheckbox name="terms" control={control} label="I accept the terms and conditions" />

          <Divider spacing={16} />

          {/* Actions */}
          <View style={styles.actions}>
            <Button variant="outline" onPress={() => reset()} style={styles.actionButton}>
              Reset
            </Button>
            <Button
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
              style={styles.actionButton}
            >
              Submit
            </Button>
          </View>
        </Card>

        {/* Validation Info */}
        <Card variant="filled" padding="md" style={styles.infoCard}>
          <Text variant="h5">Validation Rules</Text>
          <Text variant="bodySmall" color="textSecondary" style={styles.infoText}>
            • Name: Required, min 2 characters{'\n'}• Email: Required, valid email format{'\n'}•
            Phone: Optional, valid phone format{'\n'}• Country: Required{'\n'}• Plan: Required{'\n'}
            • Terms: Must be accepted
          </Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  formTitle: {
    marginBottom: 4,
  },
  formSubtitle: {
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  infoCard: {
    marginTop: 16,
  },
  infoText: {
    marginTop: 8,
    lineHeight: 20,
  },
});
