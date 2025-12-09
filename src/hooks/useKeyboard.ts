/**
 * useKeyboard Hook
 *
 * @description Track keyboard visibility and height
 *
 * @ai-guide
 * Usage:
 * ```tsx
 * const { isVisible, height } = useKeyboard();
 *
 * return (
 *   <View style={{ paddingBottom: height }}>
 *     <Input />
 *   </View>
 * );
 * ```
 */

import { useState, useEffect } from 'react';
import { Keyboard, KeyboardEvent, Platform } from 'react-native';

interface KeyboardState {
  /** Whether keyboard is visible */
  isVisible: boolean;
  /** Keyboard height in pixels */
  height: number;
}

/**
 * useKeyboard Hook
 *
 * Tracks keyboard visibility and height.
 *
 * @returns { isVisible, height }
 *
 * @example
 * ```tsx
 * function ChatInput() {
 *   const { isVisible, height } = useKeyboard();
 *
 *   return (
 *     <View
 *       style={{
 *         position: 'absolute',
 *         bottom: isVisible ? height : 0,
 *       }}
 *     >
 *       <Input placeholder="Type a message..." />
 *     </View>
 *   );
 * }
 * ```
 */
export function useKeyboard(): KeyboardState {
  const [state, setState] = useState<KeyboardState>({
    isVisible: false,
    height: 0,
  });

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const handleShow = (event: KeyboardEvent) => {
      setState({
        isVisible: true,
        height: event.endCoordinates.height,
      });
    };

    const handleHide = () => {
      setState({
        isVisible: false,
        height: 0,
      });
    };

    const showSubscription = Keyboard.addListener(showEvent, handleShow);
    const hideSubscription = Keyboard.addListener(hideEvent, handleHide);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return state;
}

/**
 * Dismiss keyboard utility
 */
export const dismissKeyboard = () => {
  Keyboard.dismiss();
};

export default useKeyboard;
