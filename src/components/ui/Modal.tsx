/**
 * Modal Component
 *
 * @description Customizable modal dialog
 *
 * @ai-guide
 * Props:
 * - `visible`: Control modal visibility
 * - `onClose`: Close callback
 * - `title`: Modal title
 * - `size`: Modal size (sm, md, lg, full)
 *
 * Usage:
 * ```tsx
 * <Modal
 *   visible={showModal}
 *   onClose={() => setShowModal(false)}
 *   title="Confirm Action"
 * >
 *   <Text>Are you sure?</Text>
 *   <Button onPress={handleConfirm}>Confirm</Button>
 * </Modal>
 * ```
 */

import React from 'react';
import {
  Modal as RNModal,
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/design-system';
import { Text } from './Text';

// Modal sizes
type ModalSize = 'sm' | 'md' | 'lg' | 'full';

export interface ModalProps {
  /** Visibility state */
  visible: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal size */
  size?: ModalSize;
  /** Show close button */
  showCloseButton?: boolean;
  /** Close on backdrop press */
  closeOnBackdrop?: boolean;
  /** Children content */
  children?: React.ReactNode;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Modal Component
 *
 * A customizable modal dialog.
 *
 * @example
 * ```tsx
 * const [visible, setVisible] = useState(false);
 *
 * <Modal
 *   visible={visible}
 *   onClose={() => setVisible(false)}
 *   title="Settings"
 *   size="md"
 * >
 *   <Text>Modal content here</Text>
 * </Modal>
 * ```
 */
export function Modal({
  visible,
  onClose,
  title,
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  children,
}: ModalProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  // Size configurations
  const sizeStyles: Record<ModalSize, ViewStyle> = {
    sm: {
      width: Math.min(SCREEN_WIDTH - 64, 320),
      maxHeight: SCREEN_HEIGHT * 0.5,
    },
    md: {
      width: Math.min(SCREEN_WIDTH - 48, 400),
      maxHeight: SCREEN_HEIGHT * 0.7,
    },
    lg: {
      width: Math.min(SCREEN_WIDTH - 32, 500),
      maxHeight: SCREEN_HEIGHT * 0.85,
    },
    full: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      borderRadius: 0,
    },
  };

  const containerStyle: ViewStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: size === 'full' ? 0 : theme.componentRadius.modal,
    ...theme.shadows.xl,
    ...sizeStyles[size],
    overflow: 'hidden',
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <Pressable
          style={[styles.overlay, { backgroundColor: theme.colors.overlay }]}
          onPress={closeOnBackdrop ? onClose : undefined}
        >
          <Pressable style={containerStyle} onPress={() => {}}>
            {/* Header */}
            {(title || showCloseButton) && (
              <View
                style={[
                  styles.header,
                  {
                    borderBottomColor: theme.colors.border,
                    paddingTop: size === 'full' ? insets.top + 12 : 16,
                  },
                ]}
              >
                {title && (
                  <Text variant="h4" style={styles.title}>
                    {title}
                  </Text>
                )}
                {showCloseButton && (
                  <Pressable
                    style={[
                      styles.closeButton,
                      { backgroundColor: theme.colors.backgroundSecondary },
                    ]}
                    onPress={onClose}
                  >
                    <Text color="textSecondary">✕</Text>
                  </Pressable>
                )}
              </View>
            )}

            {/* Content */}
            <ScrollView
              style={styles.content}
              contentContainerStyle={[
                styles.contentContainer,
                {
                  paddingBottom: size === 'full' ? insets.bottom + 16 : 16,
                },
              ]}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  title: {
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
});

export default Modal;
