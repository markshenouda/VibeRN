/**
 * Toast Component & Provider
 *
 * @description Global toast notification system
 *
 * @ai-guide
 * Setup:
 * 1. Wrap app with <ToastProvider>
 * 2. Use useToast() hook to show toasts
 *
 * Usage:
 * ```tsx
 * const { show } = useToast();
 *
 * show({ message: 'Success!', type: 'success' });
 * show({ message: 'Error occurred', type: 'error' });
 * ```
 *
 * Types: success, error, warning, info
 */

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle, Pressable, Text as RNText } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/design-system';

// Toast types
type ToastType = 'success' | 'error' | 'warning' | 'info';

// Toast position
type ToastPosition = 'top' | 'bottom';

// Toast interface
interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

// Toast options
interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
}

// Context value
interface ToastContextValue {
  show: (options: ToastOptions) => void;
  hide: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue>({
  show: () => {},
  hide: () => {},
});

// Provider props
interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
}

/**
 * ToastProvider Component
 *
 * Provides toast context to the app.
 *
 * @example
 * ```tsx
 * // In your root layout
 * <ToastProvider position="top">
 *   <App />
 * </ToastProvider>
 * ```
 */
export function ToastProvider({ children, position = 'top' }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  // Show toast
  const show = useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substring(7);
    const toast: Toast = {
      id,
      message: options.message,
      type: options.type || 'info',
      duration: options.duration || 3000,
    };

    setToasts((prev) => [...prev, toast]);

    // Auto-hide
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration);
  }, []);

  // Hide toast
  const hide = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show, hide }}>
      {children}
      <View
        style={[
          styles.container,
          position === 'top' ? { top: insets.top + 8 } : { bottom: insets.bottom + 8 },
        ]}
        pointerEvents="box-none"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onHide={hide} />
        ))}
      </View>
    </ToastContext.Provider>
  );
}

// Individual toast item
function ToastItem({ toast, onHide }: { toast: Toast; onHide: (id: string) => void }) {
  const { theme } = useTheme();
  const translateY = useRef(new Animated.Value(-20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Get colors based on type
  const getTypeColors = () => {
    const colorMap = {
      success: {
        bg: theme.colors.successLight,
        text: theme.colors.successDark,
        border: theme.colors.success,
      },
      error: {
        bg: theme.colors.errorLight,
        text: theme.colors.errorDark,
        border: theme.colors.error,
      },
      warning: {
        bg: theme.colors.warningLight,
        text: theme.colors.warningDark,
        border: theme.colors.warning,
      },
      info: {
        bg: theme.colors.infoLight,
        text: theme.colors.infoDark,
        border: theme.colors.info,
      },
    };
    return colorMap[toast.type];
  };

  const colors = getTypeColors();

  const toastStyle: ViewStyle = {
    backgroundColor: colors.bg,
    borderLeftWidth: 4,
    borderLeftColor: colors.border,
    borderRadius: theme.componentRadius.toast,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    ...theme.shadows.md,
  };

  return (
    <Animated.View style={[toastStyle, { transform: [{ translateY }], opacity }]}>
      <Pressable onPress={() => onHide(toast.id)}>
        <RNText style={{ color: colors.text, fontSize: 14 }}>{toast.message}</RNText>
      </Pressable>
    </Animated.View>
  );
}

/**
 * useToast Hook
 *
 * Access toast functions from any component.
 *
 * @example
 * ```tsx
 * const { show } = useToast();
 *
 * const handleSubmit = async () => {
 *   try {
 *     await saveData();
 *     show({ message: 'Saved successfully!', type: 'success' });
 *   } catch (error) {
 *     show({ message: 'Failed to save', type: 'error' });
 *   }
 * };
 * ```
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
  },
});

export { ToastContext };
