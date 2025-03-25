import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ReminderCategory } from '@/types/reminder';
import { useThemeStore } from '@/store/theme-store';
import { colors } from '@/constants/colors';
import { RADIUS, SPACING } from '@/constants/dimensions';
import { categoryLabels } from '@/mocks/reminders';

interface CategoryFilterProps {
  selectedCategory: ReminderCategory | 'all';
  onSelectCategory: (category: ReminderCategory | 'all') => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { theme } = useThemeStore();
  
  const categories: (ReminderCategory | 'all')[] = ['all', 'work', 'personal', 'health', 'shopping', 'other'];
  
  const getCategoryColor = (category: ReminderCategory | 'all') => {
    if (category === 'all') {
      return colors[theme].primary;
    }
    
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
  
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            {
              backgroundColor: selectedCategory === category
                ? getCategoryColor(category)
                : 'transparent',
              borderColor: getCategoryColor(category),
            }
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <ThemedText
            style={[
              styles.categoryText,
              {
                color: selectedCategory === category
                  ? '#FFFFFF'
                  : getCategoryColor(category),
              }
            ]}
          >
            {category === 'all' ? 'All' : categoryLabels[category as ReminderCategory]}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  categoryButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.round,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
});