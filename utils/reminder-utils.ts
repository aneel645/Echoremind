import { Reminder, ReminderCategory, ReminderFormData } from '@/types/reminder';

// Generate a unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Create a new reminder from form data
export const createReminder = (formData: ReminderFormData): Reminder => {
  const now = new Date();
  return {
    id: generateId(),
    title: formData.title,
    description: formData.description,
    category: formData.category,
    dueDate: formData.dueDate,
    isCompleted: false,
    priority: formData.priority,
    audioUri: formData.audioUri,
    transcription: formData.transcription,
    createdAt: now,
    updatedAt: now,
  };
};

// Update an existing reminder
export const updateReminder = (reminder: Reminder, formData: Partial<ReminderFormData>): Reminder => {
  return {
    ...reminder,
    ...formData,
    updatedAt: new Date(),
  };
};

// Simulate AI processing of voice input
export const processVoiceInput = (text: string): {
  title: string;
  category: ReminderCategory;
  dueDate: Date | null;
  priority: 'low' | 'medium' | 'high';
} => {
  // This is a simplified simulation of AI processing
  let title = text;
  let category: ReminderCategory = 'other';
  let dueDate: Date | null = null;
  let priority: 'low' | 'medium' | 'high' = 'medium';
  
  // Extract category based on keywords
  if (/work|meeting|project|client|report|presentation|email|call|conference/i.test(text)) {
    category = 'work';
  } else if (/gym|doctor|dentist|medicine|pill|exercise|workout|health|medical/i.test(text)) {
    category = 'health';
  } else if (/shop|buy|store|grocery|groceries|purchase|shopping/i.test(text)) {
    category = 'shopping';
  } else if (/family|friend|mom|dad|sister|brother|birthday|personal/i.test(text)) {
    category = 'personal';
  }
  
  // Extract priority based on keywords
  if (/urgent|important|critical|asap|emergency/i.test(text)) {
    priority = 'high';
  } else if (/whenever|sometime|low priority|not urgent/i.test(text)) {
    priority = 'low';
  }
  
  // Extract date/time information
  const now = new Date();
  
  // Check for "today", "tomorrow", day names
  if (/today/i.test(text)) {
    dueDate = new Date();
  } else if (/tomorrow/i.test(text)) {
    dueDate = new Date(now);
    dueDate.setDate(dueDate.getDate() + 1);
  } else if (/monday/i.test(text)) {
    dueDate = getNextDayOfWeek(now, 1);
  } else if (/tuesday/i.test(text)) {
    dueDate = getNextDayOfWeek(now, 2);
  } else if (/wednesday/i.test(text)) {
    dueDate = getNextDayOfWeek(now, 3);
  } else if (/thursday/i.test(text)) {
    dueDate = getNextDayOfWeek(now, 4);
  } else if (/friday/i.test(text)) {
    dueDate = getNextDayOfWeek(now, 5);
  } else if (/saturday/i.test(text)) {
    dueDate = getNextDayOfWeek(now, 6);
  } else if (/sunday/i.test(text)) {
    dueDate = getNextDayOfWeek(now, 0);
  }
  
  // Check for time patterns like "at 3 PM" or "at 15:00"
  const timeMatch = text.match(/at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
  if (timeMatch && dueDate) {
    const hours = parseInt(timeMatch[1]);
    const minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
    const period = timeMatch[3] ? timeMatch[3].toLowerCase() : null;
    
    let adjustedHours = hours;
    
    // Adjust for AM/PM if specified
    if (period === 'pm' && hours < 12) {
      adjustedHours += 12;
    } else if (period === 'am' && hours === 12) {
      adjustedHours = 0;
    }
    
    dueDate.setHours(adjustedHours, minutes, 0, 0);
  }
  
  // Clean up the title by removing time/date references
  title = title
    .replace(/remind me to /i, '')
    .replace(/remind me /i, '')
    .replace(/at \d{1,2}(?::\d{2})?\s*(?:am|pm)?/i, '')
    .replace(/today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday/i, '')
    .replace(/next week|next month/i, '')
    .replace(/urgent|important|critical|asap|emergency|whenever|sometime|low priority|not urgent/i, '')
    .trim();
  
  // Capitalize first letter
  title = title.charAt(0).toUpperCase() + title.slice(1);
  
  return { title, category, dueDate, priority };
};

// Helper function to get the next occurrence of a day of the week
function getNextDayOfWeek(date: Date, dayOfWeek: number): Date {
  const resultDate = new Date(date.getTime());
  resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
  return resultDate;
}