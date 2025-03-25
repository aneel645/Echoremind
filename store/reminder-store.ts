import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Reminder, ReminderCategory, ReminderFormData } from '@/types/reminder';
import { createReminder, updateReminder } from '@/utils/reminder-utils';
import { mockReminders } from '@/mocks/reminders';

interface ReminderState {
  reminders: Reminder[];
  selectedCategory: ReminderCategory | 'all';
  searchQuery: string;
  
  // Actions
  addReminder: (formData: ReminderFormData) => void;
  updateReminder: (id: string, formData: Partial<ReminderFormData>) => void;
  toggleComplete: (id: string) => void;
  deleteReminder: (id: string) => void;
  setSelectedCategory: (category: ReminderCategory | 'all') => void;
  setSearchQuery: (query: string) => void;
  
  // Selectors (computed values)
  getFilteredReminders: () => Reminder[];
  getReminderById: (id: string) => Reminder | undefined;
  getUpcomingReminders: () => Reminder[];
  getPastDueReminders: () => Reminder[];
  getTodayReminders: () => Reminder[];
}

export const useReminderStore = create<ReminderState>()(
  persist(
    (set, get) => ({
      reminders: mockReminders, // Start with mock data
      selectedCategory: 'all',
      searchQuery: '',
      
      // Actions
      addReminder: (formData) => {
        const newReminder = createReminder(formData);
        set((state) => ({
          reminders: [newReminder, ...state.reminders]
        }));
      },
      
      updateReminder: (id, formData) => {
        set((state) => ({
          reminders: state.reminders.map((reminder) => 
            reminder.id === id ? updateReminder(reminder, formData) : reminder
          )
        }));
      },
      
      toggleComplete: (id) => {
        set((state) => ({
          reminders: state.reminders.map((reminder) => 
            reminder.id === id 
              ? { ...reminder, isCompleted: !reminder.isCompleted, updatedAt: new Date() } 
              : reminder
          )
        }));
      },
      
      deleteReminder: (id) => {
        set((state) => ({
          reminders: state.reminders.filter((reminder) => reminder.id !== id)
        }));
      },
      
      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
      },
      
      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },
      
      // Selectors
      getFilteredReminders: () => {
        const { reminders, selectedCategory, searchQuery } = get();
        
        return reminders
          .filter((reminder) => 
            selectedCategory === 'all' || reminder.category === selectedCategory
          )
          .filter((reminder) => 
            reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (reminder.description && 
              reminder.description.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .sort((a, b) => {
            // Sort by completion status first
            if (a.isCompleted !== b.isCompleted) {
              return a.isCompleted ? 1 : -1;
            }
            
            // Then by due date (null dates at the end)
            if (a.dueDate && b.dueDate) {
              return a.dueDate.getTime() - b.dueDate.getTime();
            } else if (a.dueDate) {
              return -1;
            } else if (b.dueDate) {
              return 1;
            }
            
            // Finally by creation date (newest first)
            return b.createdAt.getTime() - a.createdAt.getTime();
          });
      },
      
      getReminderById: (id) => {
        return get().reminders.find((reminder) => reminder.id === id);
      },
      
      getUpcomingReminders: () => {
        const now = new Date();
        return get().reminders
          .filter((reminder) => 
            !reminder.isCompleted && 
            reminder.dueDate && 
            reminder.dueDate > now
          )
          .sort((a, b) => {
            if (a.dueDate && b.dueDate) {
              return a.dueDate.getTime() - b.dueDate.getTime();
            }
            return 0;
          });
      },
      
      getPastDueReminders: () => {
        const now = new Date();
        return get().reminders
          .filter((reminder) => 
            !reminder.isCompleted && 
            reminder.dueDate && 
            reminder.dueDate < now
          )
          .sort((a, b) => {
            if (a.dueDate && b.dueDate) {
              return b.dueDate.getTime() - a.dueDate.getTime();
            }
            return 0;
          });
      },
      
      getTodayReminders: () => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        return get().reminders
          .filter((reminder) => 
            !reminder.isCompleted && 
            reminder.dueDate && 
            reminder.dueDate >= today && 
            reminder.dueDate < tomorrow
          )
          .sort((a, b) => {
            if (a.dueDate && b.dueDate) {
              return a.dueDate.getTime() - b.dueDate.getTime();
            }
            return 0;
          });
      },
    }),
    {
      name: 'reminders-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        reminders: state.reminders,
      }),
    }
  )
);