import { useThemeColor } from '@/hooks/use-theme-color';
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Generate time options in 15-minute intervals
const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const period = hour < 12 ? 'AM' : 'PM';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const displayMinute = minute.toString().padStart(2, '0');
      const timeString = `${displayHour}:${displayMinute} ${period}`;
      times.push(timeString);
    }
  }
  return times;
};

/**
 * Remind me later screen for setting cooking reminders
 * Uses Picker dropdown for time selection with 15-minute intervals
 */
export default function RemindLaterScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'authBackground');
  
  const [selectedTime, setSelectedTime] = useState('12:00 PM');
  const [repeatFrequency, setRepeatFrequency] = useState('Never');
  const [note, setNote] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Generate time options (96 options for 24 hours in 15-min intervals)
  const timeOptions = useMemo(() => generateTimeOptions(), []);

  // Handle repeat dropdown (mocked)
  const handleRepeatPress = () => {
    Alert.alert(
      'Repeat Frequency',
      'Repeat options coming soon!',
      [{ text: 'OK' }]
    );
  };

  // Handle save
  const handleSave = () => {
    console.log('Saving reminder:', { selectedTime, repeatFrequency, note });
    router.replace('/(tabs)');
  };

  // Handle clear
  const handleClear = () => {
    setSelectedTime('12:00 PM');
    setRepeatFrequency('Never');
    setNote('');
  };

  // Handle time selection from picker
  const handleTimeChange = (itemValue: string) => {
    setSelectedTime(itemValue);
    setShowTimePicker(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Title */}
        <Text style={styles.title}>Remind Me Later!</Text>

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Set Time Section */}
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setShowTimePicker(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.dropdownText}>
              {selectedTime || 'Set Time'}
            </Text>
            <FontAwesome5 name="chevron-down" size={16} color="#666" />
          </TouchableOpacity>

          {/* Repeat Section */}
          <View style={styles.repeatContainer}>
            <Text style={styles.repeatLabel}>Repeat</Text>
            <TouchableOpacity
              style={styles.repeatDropdown}
              onPress={handleRepeatPress}
              activeOpacity={0.8}
            >
              <Text style={styles.repeatText}>{repeatFrequency}</Text>
              <FontAwesome5 name="sync" size={14} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Additional Note Section */}
          <View style={styles.noteContainer}>
            <Text style={styles.noteLabel}>Additional Note (optional)</Text>
            <TextInput
              style={styles.noteInput}
              value={note}
              onChangeText={setNote}
              placeholder="Write Something........"
              placeholderTextColor="#999"
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClear}
              activeOpacity={0.8}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Time Picker Modal */}
      <Modal
        visible={showTimePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTimePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Set Time</Text>
              <TouchableOpacity
                onPress={() => setShowTimePicker(false)}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseText}>Done</Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={selectedTime}
              onValueChange={handleTimeChange}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {timeOptions.map((time) => (
                <Picker.Item 
                  key={time} 
                  label={time} 
                  value={time}
                  color="#11181C"
                />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  formContainer: {
    gap: 20,
  },
  dropdownButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownText: {
    fontSize: 16,
    color: '#11181C',
    fontWeight: '500',
  },
  repeatContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  repeatLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#11181C',
  },
  repeatDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  repeatText: {
    fontSize: 16,
    color: '#11181C',
  },
  noteContainer: {
    gap: 12,
  },
  noteLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#11181C',
  },
  noteInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: '#11181C',
    minHeight: 200,
    textAlignVertical: 'top',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#789F80',
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#A8D5BA',
    paddingVertical: 14,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A8D5BA',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#11181C',
  },
  modalCloseButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#789F80',
  },
  picker: {
    width: '100%',
    height: 200,
    backgroundColor: '#FFFFFF',
  },
  pickerItem: {
    fontSize: 18,
    height: 200,
    color: '#11181C',
  },
});
