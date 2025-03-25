import React from 'react';
import { 
  TouchableOpacity, 
  TouchableOpacityProps, 
  StyleSheet, 
  ActivityIndicator,
  View
} from 'react-native';
import { ThemedText } from './ThemedText';
import { useThemeStore } from '@/store/theme-store';
import { colors } from '@/constants/colors';
import { RADIUS, SPACING } from '@/constants/dimensions';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  disabled,
  ...props
}) => {
  const { theme } = useThemeStore();
  
  const getBackgroundColor = () => {
    if (disabled) {
      return theme === 'light' ? '#E1E4E8' : '#2D2D2D';
    }
    
    switch (variant) {
      case 'secondary':
        return colors[theme].secondary;
      case 'outline':
      case 'text':
        return 'transparent';
      case 'primary':
      default:
        return colors[theme].primary;
    }
  };
  
  const getTextColor = () => {
    if (disabled) {
      return theme === 'light' ? '#71767A' : '#A0A4A8';
    }
    
    switch (variant) {
      case 'outline':
        return colors[theme].primary;
      case 'text':
        return colors[theme].primary;
      case 'primary':
      case 'secondary':
      default:
        return '#FFFFFF';
    }
  };
  
  const getBorderColor = () => {
    if (disabled) {
      return theme === 'light' ? '#E1E4E8' : '#2D2D2D';
    }
    
    switch (variant) {
      case 'outline':
        return colors[theme].primary;
      default:
        return 'transparent';
    }
  };
  
  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return styles.smallButton;
      case 'large':
        return styles.largeButton;
      case 'medium':
      default:
        return styles.mediumButton;
    }
  };
  
  const getTextSize = () => {
    switch (size) {
      case 'small':
        return { fontSize: 12 };
      case 'large':
        return { fontSize: 16 };
      case 'medium':
      default:
        return { fontSize: 14 };
    }
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonSize(),
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 1 : 0,
        },
        style
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === 'left' && (
            <View style={styles.iconLeft}>{icon}</View>
          )}
          
          <ThemedText
            variant="button"
            style={[
              getTextSize(),
              { color: getTextColor() }
            ]}
          >
            {title}
          </ThemedText>
          
          {icon && iconPosition === 'right' && (
            <View style={styles.iconRight}>{icon}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    minHeight: 32,
  },
  mediumButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    minHeight: 40,
  },
  largeButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    minHeight: 48,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: SPACING.xs,
  },
  iconRight: {
    marginLeft: SPACING.xs,
  },
});