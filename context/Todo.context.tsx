import { createContext, ReactNode, useState } from "react";

interface Todo {
    id: number;
    text: string;
    done: boolean;
    createdAt: Date;
}

interface TodoContextType {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextType>({
    todos: [],
    addTodo: () => { },
    toggleTodo: () => { },
    removeTodo: () => { },
});

interface TodoProviderProps {
    children: ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
    const [todos, setTodos] = useState<Todo[]>([
        {
            id: 1,
            text: 'Morning workout',
            done: true,
            createdAt: new Date()
        },
        {
            id: 2,
            text: 'Read a book',
            done: false,
            createdAt: new Date()
        },
        {
            id: 3,
            text: 'Buy groceries',
            done: false,
            createdAt: new Date()
        }
    ]);

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: Date.now(),
            text,
            done: false,
            createdAt: new Date(),
        };
        setTodos(prevTodos => [...prevTodos, newTodo]);
    };

    const toggleTodo = (id: number) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            )
        );
    };

    const removeTodo = (id: number) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleTodo, removeTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoContext;