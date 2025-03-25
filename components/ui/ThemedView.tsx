import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useThemeStore } from '@/store/theme-store';
import { colors } from '@/constants/colors';

interface ThemedViewProps extends ViewProps {
  variant?: 'primary' | 'card' | 'transparent';
}

export const ThemedView: React.FC<ThemedViewProps> = ({ 
  style, 
  variant = 'primary',
  children,
  ...props 
}) => {
  const { theme } = useThemeStore();
  
  const getBackgroundColor = () => {
    switch (variant) {
      case 'card':
        return colors[theme].card;
      case 'transparent':
        return 'transparent';
      case 'primary':
      default:
        return colors[theme].background;
    }
  };
  
  return (
    <View 
      style={[
        { backgroundColor: getBackgroundColor() },
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
};