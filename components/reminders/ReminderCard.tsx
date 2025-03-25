import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Reminder } from '@/types/reminder';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { PriorityIndicator } from '@/components/ui/PriorityIndicator';
import { formatDate, isPastDue } from '@/utils/date-utils';
import { useThemeStore } from '@/store/theme-store';
import { colors } from '@/constants/colors';
import { RADIUS, SPACING } from '@/constants/dimensions';
import { CheckCircle, Clock, Play } from 'lucide-react-native';

interface ReminderCardProps {
  reminder: Reminder;
  onPress: () => void;
  onToggleComplete: () => void;
  onPlayAudio?: () => void;
}

export const ReminderCard: React.FC<ReminderCardProps> = ({
  reminder,
  onPress,
  onToggleComplete,
  onPlayAudio,
}) => {
  const { theme } = useThemeStore();
  const pastDue = reminder.dueDate && isPastDue(reminder.dueDate) && !reminder.isCompleted;
  
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
    >
      <ThemedView
        variant="card"
        style={[
          styles.container,
          {
            borderLeftColor: reminder.isCompleted
              ? colors[theme].success
              : pastDue
                ? colors[theme].error
                : colors[theme][`category${reminder.category.charAt(0).toUpperCase() + reminder.category.slice(1)}` as keyof typeof colors[typeof theme]],
            opacity: reminder.isCompleted ? 0.7 : 1,
          }
        ]}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <TouchableOpacity
              onPress={onToggleComplete}
              style={styles.checkButton}
            >
              <CheckCircle
                size={24}
                color={reminder.isCompleted ? colors[theme].success : colors[theme].border}
                fill={reminder.isCompleted ? colors[theme].success : 'transparent'}
              />
            </TouchableOpacity>
            
            <View style={styles.titleTextContainer}>
              <ThemedText
                variant="subtitle"
                style={[
                  reminder.isCompleted && styles.completedText
                ]}
                numberOfLines={1}
              >
                {reminder.title}
              </ThemedText>
              
              {reminder.description && (
                <ThemedText
                  color="subtext"
                  style={[
                    styles.description,
                    reminder.isCompleted && styles.completedText
                  ]}
                  numberOfLines={2}
                >
                  {reminder.description}
                </ThemedText>
              )}
            </View>
          </View>
          
          <PriorityIndicator priority={reminder.priority} />
        </View>
        
        <View style={styles.footer}>
          <View style={styles.metaContainer}>
            <CategoryBadge category={reminder.category} size="small" />
            
            {reminder.dueDate && (
              <View style={styles.dateContainer}>
                <Clock
                  size={12}
                  color={pastDue ? colors[theme].error : colors[theme].subtext}
                  style={styles.dateIcon}
                />
                <ThemedText
                  color="subtext"
                  style={[
                    styles.dateText,
                    pastDue && styles.pastDueText
                  ]}
                >
                  {formatDate(reminder.dueDate)}
                </ThemedText>
              </View>
            )}
          </View>
          
          {reminder.audioUri && onPlayAudio && (
            <TouchableOpacity
              onPress={onPlayAudio}
              style={styles.playButton}
            >
              <Play
                size={16}
                color={colors[theme].primary}
              />
            </TouchableOpacity>
          )}
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  checkButton: {
    marginRight: SPACING.sm,
    padding: 2,
  },
  titleTextContainer: {
    flex: 1,
  },
  description: {
    marginTop: 2,
    fontSize: 14,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    marginRight: 4,
  },
  dateText: {
    fontSize: 12,
  },
  pastDueText: {
    color: '#F44336',
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.round,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});