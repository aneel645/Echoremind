import React, { useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { SearchBar } from '@/components/ui/SearchBar';
import { CategoryFilter } from '@/components/ui/CategoryFilter';
import { ReminderList } from '@/components/reminders/ReminderList';
import { VoiceRecordButton } from '@/components/reminders/VoiceRecordButton';
import { useReminderStore } from '@/store/reminder-store';
import { useThemeStore } from '@/store/theme-store';
import { ReminderCategory } from '@/types/reminder';
import { processVoiceInput } from '@/utils/reminder-utils';
import { SPACING } from '@/constants/dimensions';
import { Plus } from 'lucide-react-native';
import { IconButton } from '@/components/ui/IconButton';
import { colors } from '@/constants/colors';

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useThemeStore();
  const { 
    reminders,
    selectedCategory,
    searchQuery,
    setSelectedCategory,
    setSearchQuery,
    getFilteredReminders,
    toggleComplete,
    addReminder,
  } = useReminderStore();
  
  const [isRecording, setIsRecording] = useState(false);
  
  const filteredReminders = getFilteredReminders();
  
  const handlePressReminder = (reminder: any) => {
    router.push(`/reminder/${reminder.id}`);
  };
  
  const handleToggleComplete = (reminder: any) => {
    toggleComplete(reminder.id);
  };
  
  const handleCreateReminder = () => {
    router.push('/reminder/create');
  };
  
  const handleStartRecording = () => {
    setIsRecording(true);
    // In a real app, we would start recording audio here
  };
  
  const handleStopRecording = () => {
    setIsRecording(false);
    
    // Simulate AI processing of voice input
    setTimeout(() => {
      // This would be the result of AI transcription in a real app
      const transcription = "Remind me to call John about the project tomorrow at 3 PM";
      
      // Process the transcription with our simulated AI
      const processedData = processVoiceInput(transcription);
      
      // Add the new reminder
      addReminder({
        title: processedData.title,
        category: processedData.category,
        dueDate: processedData.dueDate,
        priority: processedData.priority,
        transcription,
        audioUri: "simulated-audio-uri", // This would be a real URI in a production app
      });
    }, 1500);
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText variant="header">EchoRemind</ThemedText>
          <IconButton
            icon={<Plus size={24} color={colors[theme].primary} />}
            onPress={handleCreateReminder}
            variant="outline"
          />
        </View>
        
        <ReminderList
          reminders={filteredReminders}
          onPressReminder={handlePressReminder}
          onToggleComplete={handleToggleComplete}
          onPlayAudio={(reminder) => alert(`Playing audio for: ${reminder.title}`)}
          emptyMessage={
            searchQuery
              ? "No reminders match your search"
              : selectedCategory !== 'all'
                ? "No reminders in this category"
                : "No reminders yet. Create one!"
          }
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search reminders..."
              />
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={(category) => setSelectedCategory(category as ReminderCategory | 'all')}
              />
            </View>
          }
        />
        
        <View style={styles.voiceButtonContainer}>
          <VoiceRecordButton
            isRecording={isRecording}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
          />
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  listHeader: {
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  voiceButtonContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    alignSelf: 'center',
  },
});