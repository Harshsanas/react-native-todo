import TodoContext from '@/context/Todo.context';
import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";
import { useContext } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width } = Dimensions.get('window');

export default function Index() {
  const { todos, toggleTodo, removeTodo } = useContext(TodoContext);

  const completedTodos = todos.filter(todo => todo.done).length;
  const totalTodos = todos.length;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6366f1" barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Hello! 👋</Text>
          <Text style={styles.headerTitle}>Your Tasks</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>
                {completedTodos} of {totalTodos} completed
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: totalTodos > 0 ? `${(completedTodos / totalTodos) * 100}%` : '0%' }
                  ]}
                />
              </View>
            </View>
            <View style={styles.progressCircle}>
              <Text style={styles.progressPercentage}>
                {totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0}%
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.todoList} showsVerticalScrollIndicator={false}>
        {todos.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="checkmark-circle-outline" size={80} color="#e5e7eb" />
            <Text style={styles.emptyTitle}>No tasks yet</Text>
            <Text style={styles.emptyDescription}>
              Add your first task to get started!
            </Text>
          </View>
        ) : (
          todos.map(todo => (
            <View key={todo.id} style={[
              styles.todoCard,
              todo.done && styles.todoCardCompleted
            ]}>
              <TouchableOpacity
                style={styles.todoContent}
                onPress={() => toggleTodo(todo.id)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.checkbox,
                  todo.done && styles.checkboxCompleted
                ]}>
                  {todo.done && (
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  )}
                </View>
                <View style={styles.todoTextContainer}>
                  <Text style={[
                    styles.todoTitle,
                    todo.done && styles.todoTitleCompleted
                  ]}>
                    {todo.text}
                  </Text>
                  <Text style={styles.todoTime}>
                    {todo.createdAt.toLocaleDateString()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeTodo(todo.id)}
                activeOpacity={0.7}
              >
                <Ionicons name="trash-outline" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          ))
        )}
        <View style={styles.bottomSpacer} />
      </ScrollView>
      <Link asChild href='/create'>
        <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: '#6366f1',
    paddingTop: StatusBar.currentHeight || 44,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#e0e7ff',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressInfo: {
    flex: 1,
    marginRight: 16,
  },
  progressText: {
    fontSize: 14,
    color: '#e0e7ff',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#4f46e5',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#34d399',
    borderRadius: 3,
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#34d399',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  todoList: {
    flex: 1,
    paddingTop: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 24,
  },
  todoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  todoCardCompleted: {
    backgroundColor: '#f8fafc',
    opacity: 0.8,
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  checkboxCompleted: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  todoTextContainer: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  todoTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  todoTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  bottomSpacer: {
    height: 100,
  },
});