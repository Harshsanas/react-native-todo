import { TodoProvider } from "@/context/Todo.context";
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
;

export default function RootLayout() {
  return (
    <TodoProvider>
      <StatusBar style="light" backgroundColor="#6366f1" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="create"
          options={{
            headerTitle: "Add New Todo",
          }}
        />
      </Stack>
    </TodoProvider>
  );
}