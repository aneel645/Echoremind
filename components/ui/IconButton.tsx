import React from 'react';
import { 
  TouchableOpacity, 
  TouchableOpacityProps, 
  StyleSheet, 
  View 
} from 'react-native';
import { useThemeStore } from '@/store/theme-store';
import { colors } from '@/constants/colors';
import { RADIUS } from '@/constants/dimensions';

interface IconButtonProps extends TouchableOpacityProps {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'ghost',
  size = 'medium',
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
      case 'primary':
        return colors[theme].primary;
      case 'secondary':
        return colors[theme].secondary;
      case 'outline':
      case 'ghost':
        return 'transparent';
      default:
        return 'transparent';
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
      disabled={disabled}
      {...props}
    >
      <View style={styles.iconContainer}>{icon}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: RADIUS.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButton: {
    width: 32,
    height: 32,
  },
  mediumButton: {
    width: 40,
    height: 40,
  },
  largeButton: {
    width: 48,
    height: 48,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});