import React from 'react';
import { StyleSheet } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ui/ThemedView';
import { ReminderForm } from '@/components/reminders/ReminderForm';
import { useReminderStore } from '@/store/reminder-store';
import { ReminderFormData } from '@/types/reminder';
import { useThemeStore } from '@/store/theme-store';
import { colors } from '@/constants/colors';

export default function CreateReminderScreen() {
  const router = useRouter();
  const { theme } = useThemeStore();
  const { addReminder } = useReminderStore();
  
  const handleCreate = (formData: ReminderFormData) => {
    addReminder(formData);
    router.back();
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen 
        options={{ 
          title: "New Reminder",
          headerStyle: {
            backgroundColor: colors[theme].background,
          },
          headerTintColor: colors[theme].text,
        }} 
      />
      
      <ThemedView style={styles.container}>
        <ReminderForm
          onSubmit={handleCreate}
          onCancel={() => router.back()}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});