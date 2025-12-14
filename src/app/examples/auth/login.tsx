/**
 * Login Screen
 *
 * @description Example login screen with form validation
 *
 * @ai-guide
 * This is an EXAMPLE auth screen demonstrating:
 * - Form handling with react-hook-form
 * - Zod validation
 * - FormInput components
 * - Toast notifications
 *
 * CLEANUP: Modify with your actual authentication logic.
 */

import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@/design-system';
import { Text, Button, Divider, useToast } from '@/components/ui';
import { FormInput, loginFormSchema, LoginFormData } from '@/components/forms';
import { Header } from '@/components/patterns';
import { sleep } from '@/lib/utils';

export default function LoginScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { show } = useToast();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Simulate API call
      await sleep(1500);

      // In a real app, call your auth API here
      console.log('Login data:', data);

      show({ message: 'Login successful!', type: 'success' });

      // Navigate to main app
      router.replace('/examples/tabs');
    } catch (error) {
      show({ message: 'Login failed. Please try again.', type: 'error' });
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
          <Text variant="h1">Welcome back</Text>
          <Text variant="body" color="textSecondary">
            Sign in to your account to continue
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

          <FormInput
            name="password"
            control={control}
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            autoComplete="password"
          />

          <Link href="/examples/auth/forgot-password" asChild>
            <Text variant="bodySmall" color="primary" style={styles.forgotPassword}>
              Forgot password?
            </Text>
          </Link>

          <Button
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            fullWidth
            style={styles.submitButton}
          >
            Sign In
          </Button>
        </View>

        {/* Divider */}
        <Divider label="OR" spacing={24} />

        {/* Social Login */}
        <View style={styles.socialButtons}>
          <Button
            variant="outline"
            fullWidth
            onPress={() => show({ message: 'Google login coming soon', type: 'info' })}
          >
            Continue with Google
          </Button>

          <Button
            variant="outline"
            fullWidth
            onPress={() => show({ message: 'Apple login coming soon', type: 'info' })}
          >
            Continue with Apple
          </Button>
        </View>

        {/* Register Link */}
        <View style={styles.footer}>
          <Text variant="body" color="textSecondary">
            Don't have an account?{' '}
          </Text>
          <Link href="/examples/auth/register" asChild>
            <Text variant="body" color="primary" style={styles.link}>
              Sign up
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 4,
    marginBottom: 8,
  },
  submitButton: {
    marginTop: 16,
  },
  socialButtons: {
    gap: 12,
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
