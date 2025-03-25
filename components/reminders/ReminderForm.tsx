import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';
import { ReminderCategory, ReminderFormData, ReminderPriority } from '@/types/reminder';
import { useThemeStore } from '@/store/theme-store';
import { colors } from '@/constants/colors';
import { RADIUS, SPACING } from '@/constants/dimensions';
import { Calendar, Clock, Mic, Play, Trash2 } from 'lucide-react-native';
import { categoryLabels, priorityLabels } from '@/mocks/reminders';
import { formatDate } from '@/utils/date-utils';

interface ReminderFormProps {
  initialData?: Partial<ReminderFormData>;
  onSubmit: (data: ReminderFormData) => void;
  onCancel: () => void;
  onDelete?: () => void;
  isEditing?: boolean;
}

export const ReminderForm: React.FC<ReminderFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  onDelete,
  isEditing = false,
}) => {
  const { theme } = useThemeStore();
  
  const [formData, setFormData] = useState<ReminderFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || 'other',
    dueDate: initialData?.dueDate || null,
    priority: initialData?.priority || 'medium',
    audioUri: initialData?.audioUri,
    transcription: initialData?.transcription,
  });
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  
  // Simulate recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);
  
  const handleStartRecording = () => {
    // In a real app, we would use expo-av to start recording
    setIsRecording(true);
    setRecordingDuration(0);
  };
  
  const handleStopRecording = () => {
    // In a real app, we would stop the recording and process the audio
    setIsRecording(false);
    
    // Simulate AI processing
    setTimeout(() => {
      // This would be the result of AI transcription
      const transcription = "This is a simulated voice transcription. In a real app, this would be the text from your voice recording.";
      
      setFormData((prev) => ({
        ...prev,
        title: prev.title || "New voice reminder",
        transcription,
        audioUri: "simulated-audio-uri", // This would be a real URI in a production app
      }));
    }, 1000);
  };
  
  const handlePlayAudio = () => {
    // In a real app, we would play the audio using expo-av
    alert("Playing audio recording...");
  };
  
  const handleDeleteAudio = () => {
    setFormData((prev) => ({
      ...prev,
      audioUri: undefined,
      transcription: undefined,
    }));
  };
  
  const handleDatePicker = () => {
    // In a real app, we would use a date picker
    // For this demo, we'll just set a date 1 day from now
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(12, 0, 0, 0);
    
    setFormData((prev) => ({
      ...prev,
      dueDate: date,
    }));
  };
  
  const handleTimePicker = () => {
    // In a real app, we would use a time picker
    // For this demo, we'll just set the time to 3 hours from now
    const date = formData.dueDate ? new Date(formData.dueDate) : new Date();
    date.setHours(date.getHours() + 3);
    
    setFormData((prev) => ({
      ...prev,
      dueDate: date,
    }));
  };
  
  const handleClearDate = () => {
    setFormData((prev) => ({
      ...prev,
      dueDate: null,
    }));
  };
  
  const handleSubmit = () => {
    if (!formData.title.trim()) {
      alert("Please enter a title for your reminder");
      return;
    }
    
    onSubmit(formData);
  };
  
  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formGroup}>
          <ThemedText variant="subtitle">Title</ThemedText>
          <TextInput
            value={formData.title}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, title: text}))}
            placeholder="Enter reminder title"
          />
        </View>
        
        <View style={styles.formGroup}>
          <ThemedText variant="subtitle">Description</ThemedText>
          <TextInput
            value={formData.description}
            onChangeText={(text) => setFormData((prev) => ({...prev, description: text}))}
            placeholder="Enter description (optional)"
            multiline
            numberOfLines={3}
          />
        </View>
        
        <View style={styles.formGroup}>
          <ThemedText variant="subtitle">Category</ThemedText>
          <View style={styles.categoryContainer}>
            {(Object.keys(categoryLabels) as ReminderCategory[]).map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor: formData.category === category
                      ? colors[theme][`category${category.charAt(0).toUpperCase() + category.slice(1)}` as keyof typeof colors[typeof theme]]
                      : 'transparent',
                    borderColor: colors[theme][`category${category.charAt(0).toUpperCase() + category.slice(1)}` as keyof typeof colors[typeof theme]],
                  }
                ]}
                onPress={() => setFormData((prev) => ({...prev, category}))}
              >
                <ThemedText
                  style={[
                    styles.categoryText,
                    {
                      color: formData.category === category
                        ? '#FFFFFF'
                        : colors[theme][`category${category.charAt(0).toUpperCase() + category.slice(1)}` as keyof typeof colors[typeof theme]],
                    }
                  ]}
                >
                  {categoryLabels[category]}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <ThemedText variant="subtitle">Priority</ThemedText>
          <View style={styles.priorityContainer}>
            {(Object.keys(priorityLabels) as ReminderPriority[]).map((priority) => (
              <TouchableOpacity
                key={priority}
                style={[
                  styles.priorityButton,
                  {
                    backgroundColor: formData.priority === priority
                      ? getPriorityColor(priority)
                      : 'transparent',
                    borderColor: getPriorityColor(priority),
                  }
                ]}
                onPress={() => setFormData((prev) => ({...prev, priority}))}
              >
                <ThemedText
                  style={[
                    styles.priorityText,
                    {
                      color: formData.priority === priority
                        ? '#FFFFFF'
                        : getPriorityColor(priority),
                    }
                  ]}
                >
                  {priorityLabels[priority]}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <ThemedText variant="subtitle">Due Date & Time</ThemedText>
          <View style={styles.dateTimeContainer}>
            <Button
              title={formData.dueDate ? "Change Date" : "Add Date"}
              variant="outline"
              size="small"
              icon={<Calendar size={16} color={colors[theme].primary} />}
              onPress={handleDatePicker}
              style={styles.dateTimeButton}
            />
            
            <Button
              title={formData.dueDate ? "Change Time" : "Add Time"}
              variant="outline"
              size="small"
              icon={<Clock size={16} color={colors[theme].primary} />}
              onPress={handleTimePicker}
              style={styles.dateTimeButton}
            />
            
            {formData.dueDate && (
              <Button
                title="Clear"
                variant="text"
                size="small"
                onPress={handleClearDate}
              />
            )}
          </View>
          
          {formData.dueDate && (
            <ThemedText color="subtext" style={styles.dateTimeText}>
              {formatDate(formData.dueDate)}
            </ThemedText>
          )}
        </View>
        
        <View style={styles.formGroup}>
          <ThemedText variant="subtitle">Voice Recording</ThemedText>
          
          {!formData.audioUri && !isRecording && (
            <Button
              title="Record Voice"
              variant="outline"
              icon={<Mic size={16} color={colors[theme].primary} />}
              onPress={handleStartRecording}
            />
          )}
          
          {isRecording && (
            <View style={styles.recordingContainer}>
              <View
                style={[
                  styles.recordingIndicator,
                  { backgroundColor: colors[theme].recording }
                ]}
              />
              <ThemedText style={styles.recordingText}>
                Recording... {formatRecordingTime(recordingDuration)}
              </ThemedText>
              <Button
                title="Stop"
                variant="primary"
                onPress={handleStopRecording}
              />
            </View>
          )}
          
          {formData.audioUri && (
            <View style={styles.audioPreviewContainer}>
              <View style={styles.audioControls}>
                <Button
                  title="Play"
                  variant="outline"
                  size="small"
                  icon={<Play size={16} color={colors[theme].primary} />}
                  onPress={handlePlayAudio}
                  style={styles.audioButton}
                />
                
                <Button
                  title="Delete"
                  variant="outline"
                  size="small"
                  icon={<Trash2 size={16} color={colors[theme].error} />}
                  onPress={handleDeleteAudio}
                  style={[styles.audioButton, { borderColor: colors[theme].error }]}
                />
              </View>
              
              {formData.transcription && (
                <View style={styles.transcriptionContainer}>
                  <ThemedText variant="subtitle">Transcription:</ThemedText>
                  <ThemedText color="subtext" style={styles.transcriptionText}>
                    {formData.transcription}
                  </ThemedText>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        {isEditing && onDelete && (
          <Button
            title="Delete"
            variant="outline"
            onPress={onDelete}
            style={[styles.deleteButton, { borderColor: colors[theme].error }]}
          />
        )}
        
        <View style={styles.actionButtons}>
          <Button
            title="Cancel"
            variant="outline"
            onPress={onCancel}
            style={styles.actionButton}
          />
          
          <Button
            title={isEditing ? "Update" : "Save"}
            variant="primary"
            onPress={handleSubmit}
            style={styles.actionButton}
          />
        </View>
      </View>
    </ThemedView>
  );
};

// Helper function to get priority color
const getPriorityColor = (priority: ReminderPriority): string => {
  switch (priority) {
    case 'high':
      return '#F44336'; // Red
    case 'medium':
      return '#FF9800'; // Orange
    case 'low':
      return '#4CAF50'; // Green
    default:
      return '#FF9800';
  }
};

// Create a TextInput component for the form
const TextInput: React.FC<React.ComponentProps<typeof View> & {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
}> = ({
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines = 1,
  style,
  ...props
}) => {
  const { theme } = useThemeStore();
  
  return (
    <View
      style={[
        styles.inputContainer,
        multiline && { height: numberOfLines * 24 + 16 },
        { 
          backgroundColor: colors[theme].card,
          borderColor: colors[theme].border,
        },
        style
      ]}
      {...props}
    >
      <ScrollView
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
      >
        <ThemedText
          style={[
            styles.input,
            multiline && styles.multilineInput,
            !value && { color: colors[theme].subtext }
          ]}
          onChangeText={onChangeText}
        >
          {value || placeholder}
        </ThemedText>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  formGroup: {
    marginBottom: SPACING.lg,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    marginTop: SPACING.xs,
    minHeight: 48,
  },
  input: {
    fontSize: 16,
    paddingVertical: 4,
  },
  multilineInput: {
    height: 'auto',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.xs,
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
  priorityContainer: {
    flexDirection: 'row',
    marginTop: SPACING.xs,
    gap: SPACING.sm,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    marginTop: SPACING.xs,
    gap: SPACING.sm,
  },
  dateTimeButton: {
    flex: 1,
  },
  dateTimeText: {
    marginTop: SPACING.xs,
  },
  recordingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
    gap: SPACING.md,
  },
  recordingIndicator: {
    width: 12,
    height: 12,
    borderRadius: RADIUS.round,
  },
  recordingText: {
    flex: 1,
  },
  audioPreviewContainer: {
    marginTop: SPACING.sm,
  },
  audioControls: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  audioButton: {
    flex: 1,
  },
  transcriptionContainer: {
    marginTop: SPACING.md,
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  transcriptionText: {
    marginTop: SPACING.xs,
    fontStyle: 'italic',
  },
  buttonContainer: {
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: Platform.select({ ios: 'rgba(0, 0, 0, 0.1)', android: 'rgba(0, 0, 0, 0.1)', web: 'rgba(0, 0, 0, 0.1)' }),
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  actionButton: {
    flex: 1,
  },
  deleteButton: {
    marginBottom: SPACING.md,
  },
});