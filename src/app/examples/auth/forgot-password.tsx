/**
 * Forgot Password Screen
 *
 * @description Example password reset screen
 *
 * @ai-guide
 * This is an EXAMPLE screen demonstrating:
 * - Simple single-field form
 * - Success state handling
 *
 * CLEANUP: Modify with your actual password reset logic.
 */

import { useState } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTheme } from '@/design-system';
import { Text, Button, useToast } from '@/components/ui';
import { FormInput, emailSchema } from '@/components/forms';
import { Header } from '@/components/patterns';
import { sleep } from '@/lib/utils';

const forgotPasswordSchema = z.object({
  email: emailSchema,
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { show } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      await sleep(1500);

      console.log('Password reset for:', data.email);

      setIsSuccess(true);
      show({ message: 'Reset link sent!', type: 'success' });
    } catch (error) {
      show({ message: 'Failed to send reset link.', type: 'error' });
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <View
        style={[
          styles.successContainer,
          {
            backgroundColor: theme.colors.background,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <View style={styles.successContent}>
          <Text variant="h1" align="center" style={styles.successIcon}>
            📧
          </Text>
          <Text variant="h2" align="center">
            Check your email
          </Text>
          <Text variant="body" color="textSecondary" align="center" style={styles.successText}>
            We've sent a password reset link to{'\n'}
            <Text variant="body" color="textPrimary">
              {getValues('email')}
            </Text>
          </Text>

          <Button
            onPress={() => router.replace('/examples/auth/login')}
            fullWidth
            style={styles.successButton}
          >
            Back to Login
          </Button>

          <Button variant="ghost" onPress={() => setIsSuccess(false)} fullWidth>
            Try another email
          </Button>
        </View>
      </View>
    );
  }

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
          <Text variant="h1">Forgot password?</Text>
          <Text variant="body" color="textSecondary">
            Enter your email and we'll send you a link to reset your password.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <FormInput
            name="email"
            control={control}
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <Button
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            fullWidth
            style={styles.submitButton}
          >
            Send Reset Link
          </Button>
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
    marginTop: 16,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  successContent: {
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  successText: {
    marginTop: 8,
    marginBottom: 32,
  },
  successButton: {
    marginBottom: 12,
  },
});
