// App color scheme
export const colors = {
  // Light theme
  light: {
    background: '#FFFFFF',
    card: '#F8F9FA',
    text: '#1A1D1E',
    subtext: '#71767A',
    primary: '#5271FF',
    secondary: '#FF7A5A',
    border: '#E1E4E8',
    success: '#4CAF50',
    error: '#F44336',
    recording: '#FF5252',
    categoryWork: '#5271FF',
    categoryPersonal: '#FF7A5A',
    categoryHealth: '#4CAF50',
    categoryShopping: '#9C27B0',
    categoryOther: '#607D8B',
  },
  
  // Dark theme
  dark: {
    background: '#121212',
    card: '#1E1E1E',
    text: '#F8F9FA',
    subtext: '#A0A4A8',
    primary: '#738AFF',
    secondary: '#FF8F73',
    border: '#2D2D2D',
    success: '#66BB6A',
    error: '#EF5350',
    recording: '#FF5252',
    categoryWork: '#738AFF',
    categoryPersonal: '#FF8F73',
    categoryHealth: '#66BB6A',
    categoryShopping: '#BA68C8',
    categoryOther: '#78909C',
  }
};

export type ThemeType = 'light' | 'dark';