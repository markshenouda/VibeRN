/**
 * Register Screen
 *
 * @description Example registration screen with form validation
 *
 * @ai-guide
 * This is an EXAMPLE auth screen demonstrating:
 * - Multi-field form with validation
 * - Password confirmation
 * - Terms acceptance checkbox
 *
 * CLEANUP: Modify with your actual registration logic.
 */

import { FormCheckbox, FormInput, registerFormSchema } from '@/components/forms';
import { Header } from '@/components/patterns';
import { Button, Text, useToast } from '@/components/ui';
import { useTheme } from '@/design-system';
import { sleep } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

// Extended schema with terms acceptance
const extendedRegisterSchema = registerFormSchema.safeExtend({
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

type ExtendedRegisterData = z.infer<typeof extendedRegisterSchema>;

export default function RegisterScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { show } = useToast();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ExtendedRegisterData>({
    resolver: zodResolver(extendedRegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: ExtendedRegisterData) => {
    try {
      await sleep(1500);

      console.log('Register data:', data);

      show({ message: 'Account created successfully!', type: 'success' });

      router.replace('/examples/tabs');
    } catch (error) {
      show({ message: 'Registration failed. Please try again.', type: 'error' });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={{ backgroundColor: theme.colors.background }}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 16 }]}
        keyboardShouldPersistTaps="handled"
      >
        <Header
          showBack
          onBack={() => router.back()}
          transparent
          style={{ paddingTop: insets.top, marginHorizontal: -16 }}
        />

        {/* Header */}
        <View style={styles.header}>
          <Text variant="h1">Create account</Text>
          <Text variant="body" color="textSecondary">
            Sign up to get started
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <FormInput
            name="name"
            control={control}
            label="Full Name"
            placeholder="John Doe"
            autoComplete="name"
          />

          <FormInput
            name="email"
            control={control}
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <FormInput
            name="password"
            control={control}
            label="Password"
            placeholder="Create a password"
            secureTextEntry
            autoComplete="new-password"
            hint="Min 8 chars, uppercase, lowercase, number"
          />

          <FormInput
            name="confirmPassword"
            control={control}
            label="Confirm Password"
            placeholder="Confirm your password"
            secureTextEntry
            autoComplete="new-password"
          />

          <FormCheckbox
            name="acceptTerms"
            control={control}
            label="I accept the Terms of Service and Privacy Policy"
          />

          <Button
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            fullWidth
            style={styles.submitButton}
          >
            Create Account
          </Button>
        </View>

        {/* Login Link */}
        <View style={styles.footer}>
          <Text variant="body" color="textSecondary">
            Already have an account?{' '}
          </Text>
          <Link href="/examples/auth/login" asChild>
            <Text variant="body" color="primary" style={styles.link}>
              Sign in
            </Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    marginBottom: 32,
  },
  form: {
    gap: 4,
  },
  submitButton: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  link: {
    fontWeight: '600',
  },
});
