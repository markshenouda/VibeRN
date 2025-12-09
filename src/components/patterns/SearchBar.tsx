/**
 * SearchBar Component
 *
 * @description Search input with debounced onChange
 *
 * @ai-guide
 * Props:
 * - `value`: Search value
 * - `onChangeText`: Text change handler
 * - `onSearch`: Debounced search handler
 * - `placeholder`: Placeholder text
 * - `debounceMs`: Debounce delay (default: 300ms)
 *
 * Usage:
 * ```tsx
 * <SearchBar
 *   value={query}
 *   onChangeText={setQuery}
 *   onSearch={handleSearch}
 *   placeholder="Search items..."
 * />
 * ```
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/design-system';
import { Text } from '@/components/ui';

export interface SearchBarProps {
  /** Current value */
  value?: string;
  /** Text change handler */
  onChangeText?: (text: string) => void;
  /** Debounced search handler */
  onSearch?: (text: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Debounce delay in ms */
  debounceMs?: number;
  /** Show cancel button */
  showCancel?: boolean;
  /** Cancel press handler */
  onCancel?: () => void;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Container style */
  style?: ViewStyle;
}

/**
 * SearchBar Component
 *
 * A search input with debouncing support.
 *
 * @example
 * ```tsx
 * const [query, setQuery] = useState('');
 *
 * <SearchBar
 *   value={query}
 *   onChangeText={setQuery}
 *   onSearch={(text) => fetchResults(text)}
 *   placeholder="Search products..."
 *   debounceMs={500}
 * />
 * ```
 */
export function SearchBar({
  value = '',
  onChangeText,
  onSearch,
  placeholder = 'Search...',
  debounceMs = 300,
  showCancel = false,
  onCancel,
  autoFocus = false,
  style,
}: SearchBarProps) {
  const { theme } = useTheme();
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const inputRef = useRef<TextInput>(null);

  // Sync external value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Handle text change with debounce
  const handleChangeText = (text: string) => {
    setLocalValue(text);
    onChangeText?.(text);

    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new debounced search
    if (onSearch) {
      debounceRef.current = setTimeout(() => {
        onSearch(text);
      }, debounceMs);
    }
  };

  // Clear input
  const handleClear = () => {
    handleChangeText('');
    inputRef.current?.focus();
  };

  // Cancel search
  const handleCancel = () => {
    handleChangeText('');
    inputRef.current?.blur();
    onCancel?.();
  };

  const containerStyle: ViewStyle = {
    backgroundColor: theme.colors.inputBackground,
    borderRadius: theme.componentRadius.input,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
  };

  return (
    <View style={[styles.wrapper, style]}>
      <View style={[styles.container, containerStyle]}>
        <Text color="textTertiary" style={styles.searchIcon}>
          🔍
        </Text>

        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            {
              color: theme.colors.textPrimary,
              fontSize: theme.typography.sizes.base,
            },
          ]}
          value={localValue}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.inputPlaceholder}
          autoFocus={autoFocus}
          returnKeyType="search"
          onSubmitEditing={() => onSearch?.(localValue)}
        />

        {localValue.length > 0 && (
          <Pressable onPress={handleClear} style={styles.clearButton}>
            <Text color="textTertiary">✕</Text>
          </Pressable>
        )}
      </View>

      {showCancel && (
        <Pressable onPress={handleCancel} style={styles.cancelButton}>
          <Text color="primary">Cancel</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: '100%',
    padding: 0,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  cancelButton: {
    marginLeft: 12,
    padding: 8,
  },
});

export default SearchBar;
