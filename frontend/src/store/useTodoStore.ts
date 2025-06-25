import { create } from "zustand";
import axios from "axios";

export type Priority = "low" | "med" | "high";
export type Status = "todo" | "in_progress" | "completed"

export type Todo = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: Status;
  created_at: Date;
  updated_at: Date;
  due_date: Date | string | null;
  archived: boolean;
  priority: Priority;
};

export type NewTodo = Omit<Todo, "id" | "created_at" | "updated_at">;

type TodoStore = {
  todos: Todo[];
  todo: Todo;
  loading: boolean;
  setTodo: (updatedTodo: Todo) => void;
  setTodos: (updatedTodos: Todo[]) => void;
  fetchTodos: () => void;
  fetchTodo: (id: string) => void;
  currentTodo: (id: string) => void;
  createTodo: (formData: NewTodo) => void;
  updateTodo: (FormData: Todo) => void;
  deleteTodo: (id: string) => void;
};

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : import.meta.env.VITE_PROD_API_URL || "";

const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  todo: {
    id: "",
    user_id: "",
    title: "",
    description: "",
    status: "todo",
    created_at: new Date(),
    updated_at: new Date(),
    due_date: new Date(),
    archived: false,
    priority: "low",
  },
  loading: false,

  setTodo: (updatedTodo: Todo) => set({ todo: updatedTodo }),
  setTodos: (updatedTodos: Todo[]) => set({ todos: updatedTodos }),

  fetchTodos: async () => {
    set({ loading: true })
    let userID = localStorage.getItem("user-id");
    if (!userID) {
      userID = crypto.randomUUID();
      localStorage.setItem("user-id", userID);
    }

    try {
      const response = await axios.get(`${BASE_URL}/api/todos`, {
        params: { user_id: userID },
      });
      set({ todos: response.data });
    } catch (error: any) {
      console.error(error.message);
    }
    set({ loading: false })
  },

  fetchTodo: async (id: string) => {
    set({ loading: true })
    let userID = localStorage.getItem("user-id");
    if (!userID) {
      userID = crypto.randomUUID();
      localStorage.setItem("user-id", userID);
    }

    try {
      const response = await axios.get(`${BASE_URL}/api/todos/${id}`, {
        params: { user_id: userID }
      })
      set({ todo: response.data })
    } catch (error: any) {
      console.error(error.message)
    }
    set({ loading: false })
  },

  currentTodo: (id: string) => {
    try {
      const response = get().todos.find((todo) => todo.id === id) as Todo
      set({ todo: response })
    } catch (error: any) {
      console.error(error.message)
    }
  },

  createTodo: async (formData: NewTodo) => {
    set({ loading: true })
    let userID = localStorage.getItem("user-id");
    if (!userID) {
      userID = crypto.randomUUID();
      localStorage.setItem("user-id", userID);
    }
    formData.user_id = userID;

    try {
      const response = await axios.post(`${BASE_URL}/api/todos`, formData);
      set((prev: TodoStore) => ({
        todos: [...prev.todos, response.data],
      }));
      get().fetchTodos();
    } catch (error: any) {
      console.error(error.message);
    }
    set({ loading: false })
  },

  updateTodo: async (formData: Todo) => {
    const existingTodo = get().todos.find((todo) => todo.id === formData.id);
    if (!existingTodo) return;

    const isStatusChanged = existingTodo.status !== formData.status;
    const isTitleChanged = existingTodo.title !== formData.title;
    const isDescriptionChanged = existingTodo.description !== formData.description;
    const isDueChanged = existingTodo.due_date !== formData.due_date;
    const isPriorityChanged = existingTodo.priority !== formData.priority;
    const isArchivedChanged = existingTodo.archived !== formData.archived;

    if (!isTitleChanged && !isDescriptionChanged && !isDueChanged && !isPriorityChanged && !isArchivedChanged && !isStatusChanged) return

    set({ loading: true })
    let userID = localStorage.getItem("user-id");
    if (!userID) {
      userID = crypto.randomUUID();
      localStorage.setItem("user-id", userID);
    }
    formData.user_id = userID;

    try {
      await axios.put(`${BASE_URL}/api/todos/${formData.id}`, formData);
      get().fetchTodos()
    } catch (error: any) {
      console.error(error.message);
    }
    set({ loading: false })
  },

  deleteTodo: async (id: string) => {
    set({ loading: true })
    const userID = localStorage.getItem("user-id")
    try {
      await axios.delete(`${BASE_URL}/api/todos/${id}`, { params: { user_id: userID } });
      get().fetchTodos();
    } catch (error: any) {
      console.error(error.message);
    }
    set({ loading: false })
  }
}));

export default useTodoStore;
