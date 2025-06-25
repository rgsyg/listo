import { useEffect } from "react";
import useTodoStore, { type Todo } from "../store/useTodoStore";
import { useLocation } from "react-router-dom";
import Masonry from "react-masonry-css";
import TodoCard from "./TodoCard";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import Column from "./Column";

export type ColumnType = { id: string; title: string };

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function MainContent() {
  const { pathname } = useLocation();
  const { todos, setTodos, fetchTodos, updateTodo } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const columns: ColumnType[] = [
    { id: "todo", title: "To Do" },
    { id: "in_progress", title: "In Progress" },
    { id: "completed", title: "Completed" },
  ];
  const archivedTodos: Todo[] = todos.filter((todo) => todo.archived);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Todo["status"];

    setTodos(
      todos.map((todo) => {
        if (todo.id === taskId) {
          updateTodo({ ...todo, status: newStatus });
          return { ...todo, status: newStatus };
        } else return todo;
      })
    );
  }

  return (
    <div className="bg-light col-9 p-4">
      <header>
        <h2>{pathname === "/" ? "Tasks" : "Archived Tasks"}</h2>
        <hr className="opacity-100 bg-black" style={{ height: "2px" }} />
      </header>
      {pathname === "/" ? (
        <DndContext onDragEnd={handleDragEnd}>
          <div className="row row-cols-3">
            {columns.map((column) => {
              return (
                <Column
                  key={column.id}
                  column={column}
                  todos={todos.filter((todo) => todo.status === column.id)}
                />
              );
            })}
          </div>
        </DndContext>
      ) : archivedTodos.length === 0 ? (
        <div className="">No archived tasks</div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {archivedTodos.map((todo: Todo) => (
            <TodoCard todo={todo} key={todo.id} />
          ))}
        </Masonry>
      )}
    </div>
  );
}
