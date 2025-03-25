import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { colors } from '@/constants/colors';
import { RADIUS, SPACING } from '@/constants/dimensions';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search reminders...',
}) => {
  const { theme } = useThemeStore();
  
  const handleClear = () => {
    onChangeText('');
  };
  
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors[theme].card,
          borderColor: colors[theme].border,
        }
      ]}
    >
      <Search
        size={20}
        color={colors[theme].subtext}
        style={styles.searchIcon}
      />
      
      <TextInput
        style={[
          styles.input,
          { color: colors[theme].text }
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors[theme].subtext}
      />
      
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <X
            size={16}
            color={colors[theme].subtext}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    paddingHorizontal: SPACING.md,
    height: 48,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  clearButton: {
    padding: SPACING.xs,
  },
});