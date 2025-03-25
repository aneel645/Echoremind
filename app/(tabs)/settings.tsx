import React from 'react';
import { StyleSheet, View, Switch, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useThemeStore } from '@/store/theme-store';
import { colors } from '@/constants/colors';
import { SPACING, RADIUS } from '@/constants/dimensions';
import { 
  Moon, 
  Sun, 
  Bell, 
  Trash2, 
  HelpCircle, 
  Info, 
  Share2,
  ChevronRight
} from 'lucide-react-native';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useThemeStore();
  
  const handleClearAllData = () => {
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to delete all your reminders? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            // In a real app, we would clear the data from the store
            Alert.alert("Data Cleared", "All reminders have been deleted.");
          },
          style: "destructive"
        }
      ]
    );
  };
  
  const handleAbout = () => {
    Alert.alert(
      "About EchoRemind",
      "EchoRemind v1.0.0\n\nAn AI-powered voice memo and reminder app that helps you stay organized with smart voice recognition and automatic categorization.",
      [{ text: "OK" }]
    );
  };
  
  const handleHelp = () => {
    Alert.alert(
      "Help & Support",
      "For help and support, please visit our website or contact our support team at support@echoremind.app",
      [{ text: "OK" }]
    );
  };
  
  const handleShare = () => {
    Alert.alert(
      "Share EchoRemind",
      "Share this app with your friends and family!",
      [{ text: "OK" }]
    );
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText variant="header">Settings</ThemedText>
        </View>
        
        <ScrollView>
          <View style={styles.section}>
            <ThemedText variant="subtitle" style={styles.sectionTitle}>
              Appearance
            </ThemedText>
            
            <ThemedView variant="card" style={styles.settingCard}>
              <View style={styles.settingRow}>
                <View style={styles.settingLabelContainer}>
                  {theme === 'dark' ? (
                    <Moon size={20} color={colors[theme].text} style={styles.settingIcon} />
                  ) : (
                    <Sun size={20} color={colors[theme].text} style={styles.settingIcon} />
                  )}
                  <ThemedText>Dark Mode</ThemedText>
                </View>
                
                <Switch
                  value={theme === 'dark'}
                  onValueChange={toggleTheme}
                  trackColor={{ 
                    false: colors[theme].border, 
                    true: colors[theme].primary 
                  }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </ThemedView>
          </View>
          
          <View style={styles.section}>
            <ThemedText variant="subtitle" style={styles.sectionTitle}>
              Notifications
            </ThemedText>
            
            <ThemedView variant="card" style={styles.settingCard}>
              <View style={styles.settingRow}>
                <View style={styles.settingLabelContainer}>
                  <Bell size={20} color={colors[theme].text} style={styles.settingIcon} />
                  <ThemedText>Enable Notifications</ThemedText>
                </View>
                
                <Switch
                  value={true}
                  trackColor={{ 
                    false: colors[theme].border, 
                    true: colors[theme].primary 
                  }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </ThemedView>
          </View>
          
          <View style={styles.section}>
            <ThemedText variant="subtitle" style={styles.sectionTitle}>
              Data Management
            </ThemedText>
            
            <ThemedView variant="card" style={styles.settingCard}>
              <TouchableOpacity
                style={styles.settingRow}
                onPress={handleClearAllData}
              >
                <View style={styles.settingLabelContainer}>
                  <Trash2 size={20} color={colors[theme].error} style={styles.settingIcon} />
                  <ThemedText style={{ color: colors[theme].error }}>
                    Clear All Data
                  </ThemedText>
                </View>
                
                <ChevronRight size={20} color={colors[theme].subtext} />
              </TouchableOpacity>
            </ThemedView>
          </View>
          
          <View style={styles.section}>
            <ThemedText variant="subtitle" style={styles.sectionTitle}>
              About
            </ThemedText>
            
            <ThemedView variant="card" style={styles.settingCard}>
              <TouchableOpacity
                style={styles.settingRow}
                onPress={handleAbout}
              >
                <View style={styles.settingLabelContainer}>
                  <Info size={20} color={colors[theme].text} style={styles.settingIcon} />
                  <ThemedText>About EchoRemind</ThemedText>
                </View>
                
                <ChevronRight size={20} color={colors[theme].subtext} />
              </TouchableOpacity>
              
              <View style={styles.divider} />
              
              <TouchableOpacity
                style={styles.settingRow}
                onPress={handleHelp}
              >
                <View style={styles.settingLabelContainer}>
                  <HelpCircle size={20} color={colors[theme].text} style={styles.settingIcon} />
                  <ThemedText>Help & Support</ThemedText>
                </View>
                
                <ChevronRight size={20} color={colors[theme].subtext} />
              </TouchableOpacity>
              
              <View style={styles.divider} />
              
              <TouchableOpacity
                style={styles.settingRow}
                onPress={handleShare}
              >
                <View style={styles.settingLabelContainer}>
                  <Share2 size={20} color={colors[theme].text} style={styles.settingIcon} />
                  <ThemedText>Share EchoRemind</ThemedText>
                </View>
                
                <ChevronRight size={20} color={colors[theme].subtext} />
              </TouchableOpacity>
            </ThemedView>
          </View>
          
          <View style={styles.versionContainer}>
            <ThemedText color="subtext" style={styles.versionText}>
              EchoRemind v1.0.0
            </ThemedText>
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.xs,
  },
  settingCard: {
    marginHorizontal: SPACING.md,
    borderRadius: RADIUS.lg,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: SPACING.sm,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: SPACING.md,
  },
  versionContainer: {
    alignItems: 'center',
    padding: SPACING.lg,
  },
  versionText: {
    fontSize: 12,
  },
});