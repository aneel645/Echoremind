import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useThemeStore } from '@/store/theme-store';
import { colors } from '@/constants/colors';

interface ThemedTextProps extends TextProps {
  variant?: 'header' | 'title' | 'subtitle' | 'body' | 'caption' | 'button';
  color?: 'primary' | 'secondary' | 'subtext';
}

export const ThemedText: React.FC<ThemedTextProps> = ({ 
  style, 
  variant = 'body',
  color = 'primary',
  children,
  ...props 
}) => {
  const { theme } = useThemeStore();
  
  const getTextColor = () => {
    switch (color) {
      case 'secondary':
        return colors[theme].secondary;
      case 'subtext':
        return colors[theme].subtext;
      case 'primary':
      default:
        return colors[theme].text;
    }
  };
  
  const getTextStyle = () => {
    switch (variant) {
      case 'header':
        return styles.header;
      case 'title':
        return styles.title;
      case 'subtitle':
        return styles.subtitle;
      case 'caption':
        return styles.caption;
      case 'button':
        return styles.button;
      case 'body':
      default:
        return styles.body;
    }
  };
  
  return (
    <Text 
      style={[
        getTextStyle(),
        { color: getTextColor() },
        style
      ]} 
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.15,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.15,
  },
  body: {
    fontSize: 16,
    letterSpacing: 0.5,
  },
  caption: {
    fontSize: 12,
    letterSpacing: 0.4,
  },
  button: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.25,
    textTransform: 'uppercase',
  },
});