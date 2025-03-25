import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { Mic } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { colors } from '@/constants/colors';
import { RADIUS } from '@/constants/dimensions';
import { ThemedText } from '@/components/ui/ThemedText';

interface VoiceRecordButtonProps {
  onStartRecording: () => void;
  onStopRecording: () => void;
  isRecording: boolean;
}

export const VoiceRecordButton: React.FC<VoiceRecordButtonProps> = ({
  onStartRecording,
  onStopRecording,
  isRecording,
}) => {
  const { theme } = useThemeStore();
  const [recordingDuration, setRecordingDuration] = useState(0);
  
  // Animation values
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  
  // Start pulse animation when recording
  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: Platform.OS !== 'web',
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
      setRecordingDuration(0);
    }
    
    return () => {
      pulseAnim.setValue(1);
    };
  }, [isRecording, pulseAnim]);
  
  // Recording timer
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
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handlePress = () => {
    if (isRecording) {
      onStopRecording();
    } else {
      onStartRecording();
    }
  };
  
  return (
    <View style={styles.container}>
      {isRecording && (
        <View style={styles.timerContainer}>
          <View style={[styles.recordingIndicator, { backgroundColor: colors[theme].recording }]} />
          <ThemedText style={styles.timerText}>
            {formatTime(recordingDuration)}
          </ThemedText>
        </View>
      )}
      
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Animated.View
          style={[
            styles.button,
            {
              backgroundColor: isRecording ? colors[theme].recording : colors[theme].primary,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <Mic size={24} color="#FFFFFF" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.round,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.round,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  recordingIndicator: {
    width: 8,
    height: 8,
    borderRadius: RADIUS.round,
    marginRight: 6,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '600',
  },
});