import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ReminderPriority } from '@/types/reminder';
import { useThemeStore } from '@/store/theme-store';
import { RADIUS } from '@/constants/dimensions';

interface PriorityIndicatorProps {
  priority: ReminderPriority;
  size?: 'small' | 'medium';
}

export const PriorityIndicator: React.FC<PriorityIndicatorProps> = ({
  priority,
  size = 'medium',
}) => {
  const { theme } = useThemeStore();
  
  const getPriorityColor = () => {
    switch (priority) {
      case 'high':
        return '#F44336'; // Red
      case 'medium':
        return '#FF9800'; // Orange
      case 'low':
      default:
        return '#4CAF50'; // Green
    }
  };
  
  const getIndicatorSize = () => {
    switch (size) {
      case 'small':
        return styles.smallIndicator;
      case 'medium':
      default:
        return styles.mediumIndicator;
    }
  };
  
  return (
    <View
      style={[
        styles.indicator,
        getIndicatorSize(),
        { backgroundColor: getPriorityColor() }
      ]}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    borderRadius: RADIUS.round,
  },
  smallIndicator: {
    width: 8,
    height: 8,
  },
  mediumIndicator: {
    width: 12,
    height: 12,
  },
});