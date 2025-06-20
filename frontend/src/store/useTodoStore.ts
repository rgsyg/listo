import { create } from "zustand";
import axios from "axios";

export type Priority = "low" | "med" | "high";

export type Todo = {
  id: number;
  user_id: string;
  title: string;
  description: string;
  is_completed: boolean;
  created_at: Date;
  updated_at: Date;
  due_date: Date;
  archived: boolean;
  priority: Priority;
};

export type NewTodo = Omit<Todo, "id" | "created_at" | "updated_at">;

type TodoStore = {
  todos: Todo[];
  todo: Todo;
  fetchTodos: () => void;
  fetchTodo: (id: number) => void;
  createTodo: (formData: NewTodo) => void;
  updateTodo: (FormData: Todo) => void;
};

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "";

const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [
    {
      id: 0,
      user_id: "",
      title: "",
      description: "",
      is_completed: false,
      created_at: new Date(),
      updated_at: new Date(),
      due_date: new Date(),
      archived: false,
      priority: "low",
    },
  ],

  todo: {
    id: 0,
    user_id: "",
    title: "",
    description: "",
    is_completed: false,
    created_at: new Date(),
    updated_at: new Date(),
    due_date: new Date(),
    archived: false,
    priority: "low",
  },

  fetchTodos: async () => {
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
  },

  fetchTodo: async (id: number) => {
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
  },

  createTodo: async (formData: NewTodo) => {
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
  },

  updateTodo: async (formData: Todo) => {
    let userID = localStorage.getItem("user-id");
    if (!userID) {
      userID = crypto.randomUUID();
      localStorage.setItem("user-id", userID);
    }
    formData.user_id = userID;

    try {
      const response = await axios.put(`${BASE_URL}/api/todos/${formData.id}`, formData);
    } catch (error: any) {
      console.error(error.message);
    }
  },

}));

export default useTodoStore;
