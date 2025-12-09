/**
 * Select Component
 *
 * @description Dropdown select input
 *
 * @ai-guide
 * Props:
 * - `value`: Currently selected value
 * - `onValueChange`: Callback when selection changes
 * - `options`: Array of { value, label } options
 * - `placeholder`: Placeholder text
 * - `label`: Input label
 *
 * Usage:
 * ```tsx
 * <Select
 *   label="Country"
 *   value={country}
 *   onValueChange={setCountry}
 *   options={countries}
 *   placeholder="Select a country"
 * />
 * ```
 *
 * Note: This is a simple implementation. For production,
 * consider using a bottom sheet or modal for better UX.
 */

import React, { useState } from 'react';
import { View, Pressable, Modal, FlatList, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/design-system';
import { Text } from './Text';

// Select option type
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  /** Currently selected value */
  value?: string;
  /** Change handler */
  onValueChange?: (value: string) => void;
  /** Available options */
  options: SelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Input label */
  label?: string;
  /** Error message */
  error?: string;
  /** Disable the select */
  disabled?: boolean;
  /** Container style */
  style?: ViewStyle;
}

/**
 * Select Component
 *
 * A dropdown select for choosing from options.
 *
 * @example
 * ```tsx
 * const [category, setCategory] = useState('');
 *
 * <Select
 *   label="Category"
 *   value={category}
 *   onValueChange={setCategory}
 *   options={[
 *     { value: 'tech', label: 'Technology' },
 *     { value: 'design', label: 'Design' },
 *   ]}
 *   placeholder="Select category"
 * />
 * ```
 */
export function Select({
  value,
  onValueChange,
  options,
  placeholder = 'Select an option',
  label,
  error,
  disabled = false,
  style,
}: SelectProps) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onValueChange?.(optionValue);
    setIsOpen(false);
  };

  // Trigger style
  const triggerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.inputBackground,
    borderWidth: 1.5,
    borderColor: error ? theme.colors.error : theme.colors.inputBorder,
    borderRadius: theme.componentRadius.input,
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2.5],
    minHeight: 44,
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text variant="label" style={styles.label}>
          {label}
        </Text>
      )}

      <Pressable
        style={triggerStyle}
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
      >
        <Text variant="body" color={selectedOption ? 'textPrimary' : 'textTertiary'}>
          {selectedOption?.label || placeholder}
        </Text>
        <Text color="textSecondary">▼</Text>
      </Pressable>

      {error && (
        <Text variant="caption" color="error" style={styles.error}>
          {error}
        </Text>
      )}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          style={[styles.overlay, { backgroundColor: theme.colors.overlay }]}
          onPress={() => setIsOpen(false)}
        >
          <View
            style={[
              styles.dropdown,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.componentRadius.modal,
                ...theme.shadows.lg,
              },
            ]}
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.option,
                    item.value === value && {
                      backgroundColor: theme.colors.primaryLight,
                    },
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text variant="body" color={item.value === value ? 'primary' : 'textPrimary'}>
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 6,
  },
  error: {
    marginTop: 4,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dropdown: {
    width: '100%',
    maxHeight: 300,
    padding: 8,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});

export default Select;
