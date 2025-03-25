import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ui/ThemedView';
import { ReminderForm } from '@/components/reminders/ReminderForm';
import { useReminderStore } from '@/store/reminder-store';
import { useThemeStore } from '@/store/theme-store';
import { colors } from '@/constants/colors';

export default function ReminderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { theme } = useThemeStore();
  const { getReminderById, updateReminder, deleteReminder } = useReminderStore();
  
  const reminder = getReminderById(id);
  
  // If reminder not found, show error and go back
  if (!reminder) {
    Alert.alert("Error", "Reminder not found", [
      { text: "OK", onPress: () => router.back() }
    ]);
    return null;
  }
  
  const handleUpdate = (formData: any) => {
    updateReminder(id, formData);
    router.back();
  };
  
  const handleDelete = () => {
    Alert.alert(
      "Delete Reminder",
      "Are you sure you want to delete this reminder?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            deleteReminder(id);
            router.back();
          },
          style: "destructive"
        }
      ]
    );
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen 
        options={{ 
          title: "Edit Reminder",
          headerStyle: {
            backgroundColor: colors[theme].background,
          },
          headerTintColor: colors[theme].text,
        }} 
      />
      
      <ThemedView style={styles.container}>
        <ReminderForm
          initialData={reminder}
          onSubmit={handleUpdate}
          onCancel={() => router.back()}
          onDelete={handleDelete}
          isEditing={true}
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