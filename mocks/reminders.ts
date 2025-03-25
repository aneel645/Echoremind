import { Reminder, ReminderCategory } from '@/types/reminder';

// Helper to create dates relative to now
const daysFromNow = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

// Helper to create hours from now
const hoursFromNow = (hours: number): Date => {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  return date;
};

export const mockReminders: Reminder[] = [
  {
    id: '1',
    title: 'Call John about project',
    description: "Need to discuss the timeline for the new feature implementation",
    category: 'work',
    dueDate: hoursFromNow(2),
    isCompleted: false,
    priority: 'high',
    transcription: "Remind me to call John about the project timeline at 5 PM",
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000),
  },
  {
    id: '2',
    title: 'Pick up groceries',
    description: "Milk, eggs, bread, and vegetables",
    category: 'shopping',
    dueDate: daysFromNow(1),
    isCompleted: false,
    priority: 'medium',
    transcription: "Don't forget to pick up groceries tomorrow. I need milk, eggs, bread, and vegetables",
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    updatedAt: new Date(Date.now() - 172800000),
  },
  {
    id: '3',
    title: 'Dentist appointment',
    description: "Annual checkup at Dr. Smith's office",
    category: 'health',
    dueDate: daysFromNow(3),
    isCompleted: false,
    priority: 'medium',
    transcription: "I have a dentist appointment on Friday at 2 PM for my annual checkup with Dr. Smith",
    createdAt: new Date(Date.now() - 259200000), // 3 days ago
    updatedAt: new Date(Date.now() - 259200000),
  },
  {
    id: '4',
    title: 'Mom's birthday',
    description: "Buy flowers and call her in the morning",
    category: 'personal',
    dueDate: daysFromNow(5),
    isCompleted: false,
    priority: 'high',
    transcription: "Mom's birthday is on Sunday. Remember to buy flowers and call her in the morning",
    createdAt: new Date(Date.now() - 345600000), // 4 days ago
    updatedAt: new Date(Date.now() - 345600000),
  },
  {
    id: '5',
    title: 'Submit expense report',
    description: "Include receipts from the business trip",
    category: 'work',
    dueDate: daysFromNow(2),
    isCompleted: true,
    priority: 'medium',
    transcription: "Need to submit my expense report by Wednesday with all receipts from the business trip",
    createdAt: new Date(Date.now() - 432000000), // 5 days ago
    updatedAt: new Date(Date.now() - 86400000), // Updated 1 day ago
  },
  {
    id: '6',
    title: 'Gym session',
    description: "Focus on cardio and core exercises",
    category: 'health',
    dueDate: hoursFromNow(6),
    isCompleted: false,
    priority: 'low',
    transcription: "Go to the gym this evening and focus on cardio and core exercises",
    createdAt: new Date(Date.now() - 43200000), // 12 hours ago
    updatedAt: new Date(Date.now() - 43200000),
  },
  {
    id: '7',
    title: 'Team meeting notes',
    description: "Prepare agenda for tomorrow's meeting",
    category: 'work',
    dueDate: hoursFromNow(20),
    isCompleted: false,
    priority: 'high',
    transcription: "Prepare the agenda for tomorrow's team meeting and send it to everyone by tonight",
    createdAt: new Date(Date.now() - 21600000), // 6 hours ago
    updatedAt: new Date(Date.now() - 21600000),
  }
];

export const categoryLabels: Record<ReminderCategory, string> = {
  work: 'Work',
  personal: 'Personal',
  health: 'Health',
  shopping: 'Shopping',
  other: 'Other'
};

export const priorityLabels: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High'
};