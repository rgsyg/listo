import { useDroppable } from "@dnd-kit/core";
import type { Todo } from "../store/useTodoStore";
import type { ColumnType } from "./MainContent";
import TodoCard from "./TodoCard";

export default function Column({
  column,
  todos,
}: {
  column: ColumnType;
  todos: Todo[];
}) {
  const { active, isOver, setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className="col m-0">
      <div
        className="card p-3 fw-bold border border-black border-2 fs-5 mb-4"
        style={{
          backgroundColor:
            column.id === "todo"
              ? "orange"
              : column.id === "in_progress"
              ? "lightskyblue"
              : "lightgreen",
          boxShadow: "8px 6px",
        }}
      >
        {column.title}
      </div>
      <div ref={setNodeRef} className="d-flex flex-column gap-4">
        {todos.length > 0 &&
          todos
            .filter((todo) => !todo.archived)
            .map((todo) => <TodoCard key={todo.id} todo={todo} />)}
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "200px", // or match card height
            backgroundColor: "lightgrey",
            visibility: isOver || active === null ? "hidden" : "visible",
          }}
        >
          {isOver && active === null ? "Drop Here" : ""}
        </div>
      </div>
    </div>
  );
}
