export type ReminderCategory = 'work' | 'personal' | 'health' | 'shopping' | 'other';

export type ReminderPriority = 'low' | 'medium' | 'high';

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  category: ReminderCategory;
  dueDate?: Date | null;
  isCompleted: boolean;
  priority: ReminderPriority;
  audioUri?: string;
  transcription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReminderFormData {
  title: string;
  description?: string;
  category: ReminderCategory;
  dueDate?: Date | null;
  priority: ReminderPriority;
  audioUri?: string;
  transcription?: string;
}