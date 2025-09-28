import TodoContext from "@/context/Todo.context";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useContext, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

export default function CreateTodo() {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { addTodo } = useContext(TodoContext);
  const textInputRef = useRef<TextInput>(null);

  const dismissKeyboardAndBlur = () => {
    Keyboard.dismiss();
    setIsFocused(false);
    textInputRef.current?.blur();
  };

  const handleCreateTodo = () => {
    if (text.trim().length === 0) {
      Alert.alert('Empty Task', 'Please enter a task description.');
      return;
    }

    if (text.trim().length > 100) {
      Alert.alert('Task Too Long', 'Please keep your task under 100 characters.');
      return;
    }

    dismissKeyboardAndBlur();
    addTodo(text.trim());
    setText('');
    setTimeout(() => router.back(), 50);
  };

  const handleCancel = () => {
    dismissKeyboardAndBlur();

    if (text.trim().length > 0) {
      Alert.alert(
        'Discard Changes',
        'Are you sure you want to discard this task?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => textInputRef.current?.focus()
          },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => setTimeout(() => router.back(), 50)
          }
        ]
      );
    } else {
      setTimeout(() => router.back(), 50);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboardAndBlur}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#6366f1" barStyle="light-content" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="never"
        >
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="create-outline" size={32} color="#6366f1" />
              </View>
            </View>

            <Text style={styles.title}>Create New Task</Text>
            <Text style={styles.subtitle}>
              What would you like to accomplish today?
            </Text>

            <View style={styles.formContainer}>
              <View style={[
                styles.inputContainer,
                isFocused && styles.inputContainerFocused
              ]}>
                <TextInput
                  ref={textInputRef}
                  style={styles.textInput}
                  value={text}
                  onChangeText={setText}
                  placeholder="Enter your task..."
                  placeholderTextColor="#9ca3af"
                  multiline
                  maxLength={100}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  blurOnSubmit={true}
                  returnKeyType="default"
                />
              </View>

              <View style={styles.charCounter}>
                <Text style={[
                  styles.charCountText,
                  text.length > 80 && styles.charCountWarning
                ]}>
                  {text.length}/100
                </Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancel}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.createButton,
                    text.trim().length === 0 && styles.createButtonDisabled
                  ]}
                  onPress={handleCreateTodo}
                  activeOpacity={0.7}
                  disabled={text.trim().length === 0}
                >
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color="#fff"
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.createButtonText}>Create Task</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Quick suggestions:</Text>
            <View style={styles.suggestionTags}>
              {['Exercise', 'Read a book', 'Call family', 'Buy groceries'].map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionTag}
                  onPress={() => {
                    setText(suggestion);
                    textInputRef.current?.focus();
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  formContainer: {
    marginBottom: 40,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputContainerFocused: {
    borderColor: '#6366f1',
    shadowColor: '#6366f1',
    shadowOpacity: 0.1,
  },
  textInput: {
    fontSize: 16,
    color: '#1f2937',
    minHeight: 60,
    textAlignVertical: 'top',
    lineHeight: 24,
  },
  charCounter: {
    alignItems: 'flex-end',
    marginTop: 8,
    marginRight: 4,
  },
  charCountText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  charCountWarning: {
    color: '#f59e0b',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  createButton: {
    flex: 2,
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonDisabled: {
    backgroundColor: '#d1d5db',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonIcon: {
    marginRight: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  suggestionsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 12,
  },
  suggestionTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#e0e7ff',
    borderRadius: 20,
  },
  suggestionText: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '500',
  },
});