import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ReminderCategory } from '@/types/reminder';
import { useThemeStore } from '@/store/theme-store';
import { colors } from '@/constants/colors';
import { RADIUS, SPACING } from '@/constants/dimensions';
import { categoryLabels } from '@/mocks/reminders';

interface CategoryBadgeProps {
  category: ReminderCategory;
  size?: 'small' | 'medium';
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  size = 'medium',
}) => {
  const { theme } = useThemeStore();
  
  const getCategoryColor = () => {
    switch (category) {
      case 'work':
        return colors[theme].categoryWork;
      case 'personal':
        return colors[theme].categoryPersonal;
      case 'health':
        return colors[theme].categoryHealth;
      case 'shopping':
        return colors[theme].categoryShopping;
      case 'other':
      default:
        return colors[theme].categoryOther;
    }
  };
  
  const getBadgeSize = () => {
    switch (size) {
      case 'small':
        return styles.smallBadge;
      case 'medium':
      default:
        return styles.mediumBadge;
    }
  };
  
  const getTextSize = () => {
    switch (size) {
      case 'small':
        return { fontSize: 10 };
      case 'medium':
      default:
        return { fontSize: 12 };
    }
  };
  
  return (
    <View
      style={[
        styles.badge,
        getBadgeSize(),
        { backgroundColor: getCategoryColor() }
      ]}
    >
      <ThemedText
        style={[
          styles.text,
          getTextSize(),
        ]}
      >
        {categoryLabels[category]}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: RADIUS.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallBadge: {
    paddingVertical: 2,
    paddingHorizontal: SPACING.xs,
  },
  mediumBadge: {
    paddingVertical: 4,
    paddingHorizontal: SPACING.sm,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});