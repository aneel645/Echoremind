import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Reminder } from '@/types/reminder';
import { ReminderCard } from './ReminderCard';
import { ThemedText } from '@/components/ui/ThemedText';
import { SPACING } from '@/constants/dimensions';

interface ReminderListProps {
  reminders: Reminder[];
  onPressReminder: (reminder: Reminder) => void;
  onToggleComplete: (reminder: Reminder) => void;
  onPlayAudio?: (reminder: Reminder) => void;
  emptyMessage?: string;
  ListHeaderComponent?: React.ReactElement;
}

export const ReminderList: React.FC<ReminderListProps> = ({
  reminders,
  onPressReminder,
  onToggleComplete,
  onPlayAudio,
  emptyMessage = 'No reminders found',
  ListHeaderComponent,
}) => {
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <ThemedText color="subtext" style={styles.emptyText}>
        {emptyMessage}
      </ThemedText>
    </View>
  );
  
  return (
    <FlatList
      data={reminders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReminderCard
          reminder={item}
          onPress={() => onPressReminder(item)}
          onToggleComplete={() => onToggleComplete(item)}
          onPlayAudio={onPlayAudio ? () => onPlayAudio(item) : undefined}
        />
      )}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={renderEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: SPACING.md,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
  },
});