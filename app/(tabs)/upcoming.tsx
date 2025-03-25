import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { ReminderList } from '@/components/reminders/ReminderList';
import { useReminderStore } from '@/store/reminder-store';
import { SPACING } from '@/constants/dimensions';

export default function UpcomingScreen() {
  const router = useRouter();
  const { 
    getUpcomingReminders,
    getTodayReminders,
    getPastDueReminders,
    toggleComplete,
  } = useReminderStore();
  
  const upcomingReminders = getUpcomingReminders();
  const todayReminders = getTodayReminders();
  const pastDueReminders = getPastDueReminders();
  
  const handlePressReminder = (reminder: any) => {
    router.push(`/reminder/${reminder.id}`);
  };
  
  const handleToggleComplete = (reminder: any) => {
    toggleComplete(reminder.id);
  };
  
  // Determine which section to show based on available reminders
  const showPastDue = pastDueReminders.length > 0;
  const showToday = todayReminders.length > 0;
  const showUpcoming = upcomingReminders.length > 0;
  
  // If no reminders in any section, show a message
  const noReminders = !showPastDue && !showToday && !showUpcoming;
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText variant="header">Upcoming</ThemedText>
        </View>
        
        {noReminders ? (
          <View style={styles.emptyContainer}>
            <ThemedText color="subtext" style={styles.emptyText}>
              No upcoming reminders
            </ThemedText>
          </View>
        ) : (
          <View style={styles.sectionsContainer}>
            {showPastDue && (
              <View style={styles.section}>
                <ThemedText variant="title" style={styles.sectionTitle}>
                  Past Due
                </ThemedText>
                <ReminderList
                  reminders={pastDueReminders}
                  onPressReminder={handlePressReminder}
                  onToggleComplete={handleToggleComplete}
                  onPlayAudio={(reminder) => alert(`Playing audio for: ${reminder.title}`)}
                  emptyMessage=""
                />
              </View>
            )}
            
            {showToday && (
              <View style={styles.section}>
                <ThemedText variant="title" style={styles.sectionTitle}>
                  Today
                </ThemedText>
                <ReminderList
                  reminders={todayReminders}
                  onPressReminder={handlePressReminder}
                  onToggleComplete={handleToggleComplete}
                  onPlayAudio={(reminder) => alert(`Playing audio for: ${reminder.title}`)}
                  emptyMessage=""
                />
              </View>
            )}
            
            {showUpcoming && (
              <View style={styles.section}>
                <ThemedText variant="title" style={styles.sectionTitle}>
                  Upcoming
                </ThemedText>
                <ReminderList
                  reminders={upcomingReminders}
                  onPressReminder={handlePressReminder}
                  onToggleComplete={handleToggleComplete}
                  onPlayAudio={(reminder) => alert(`Playing audio for: ${reminder.title}`)}
                  emptyMessage=""
                />
              </View>
            )}
          </View>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  sectionsContainer: {
    flex: 1,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.xs,
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