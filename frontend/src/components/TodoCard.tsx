import Modal from "bootstrap/js/dist/modal";
import type { Priority, Todo } from "../store/useTodoStore";
import useTodoStore from "../store/useTodoStore";
import { useDraggable } from "@dnd-kit/core";

export default function TodoCard({ todo }: { todo: Todo }) {
  const { currentTodo, updateTodo, deleteTodo } = useTodoStore();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: todo.id,
  });

  const createBadge = (priority: Priority) => {
    if (priority === "low") {
      return <span className="badge text-bg-info">Low</span>;
    } else if (priority === "med") {
      return <span className="badge text-bg-warning">Med</span>;
    } else {
      return <span className="badge text-bg-danger">High</span>;
    }
  };

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="card p-3 fw-bold border border-black border-2 fs-5"
      style={style}
    >
      <div className="card-body p-0">
        <h5 className="card-title">
          <span className="fw-bold">{todo.title}</span>
        </h5>
        <div className="d-flex justify-content-between align-items-center fs-6">
          {createBadge(todo.priority)}
          <p
            className="text-muted m-0 fw-normal"
            style={{ fontSize: "0.90rem" }}
          >
            {"Created on " +
              new Date(todo.created_at).toLocaleString().split(",")[0]}
          </p>
        </div>
        <p className="card-text fw-normal pb-3 pt-2">{todo.description}</p>
        <div className="row g-0 align-items-end">
          <div className="col d-flex gap-3">
            {todo.archived ? (
              ""
            ) : (
              <button
                className="btn btn-light border border-2 border-black"
                style={{
                  padding: "0.10rem 0.45rem",
                  backgroundColor:
                    todo.status === "completed" ? "lightgreen" : "",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  updateTodo({
                    ...todo,
                    status: todo.status === "completed" ? "todo" : "completed",
                  });
                }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <i className="bi bi-check2" style={{ fontSize: "1rem" }} />
              </button>
            )}
            <button
              className="btn btn-light border border-2 border-black"
              style={{ padding: "0.10rem 0.45rem" }}
              onClick={(e) => {
                e.stopPropagation();
                currentTodo(todo.id);
                const updateModal = document.getElementById("updateModal");
                if (updateModal) {
                  const modal = Modal.getOrCreateInstance(updateModal);
                  modal.show();
                }
              }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <i className="bi bi-pencil" style={{ fontSize: "1rem" }} />
            </button>
            <div className="dropdown">
              <button
                className="btn btn-light border border-2 border-black dropdown-toggle"
                data-bs-toggle="dropdown"
                style={{ padding: "0.10rem 0.45rem" }}
              >
                <i className="bi bi-three-dots" style={{ fontSize: "1rem" }} />
              </button>
              <ul className="dropdown-menu">
                <li>
                  {todo.archived ? (
                    <button
                      className="btn btn-light dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateTodo({ ...todo, archived: false });
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      Unarchive
                    </button>
                  ) : (
                    <button
                      className="dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateTodo({ ...todo, archived: true });
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      Archive
                    </button>
                  )}
                </li>
                <li>
                  <button
                    className="btn btn-light dropdown-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTodo(todo.id);
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="col text-end text-muted fw-normal"
            style={{ fontSize: "0.90rem" }}
          >
            {todo.due_date
              ? "Due on " +
                new Date(todo.due_date).toLocaleString().split(",")[0]
              : "No deadline"}
          </div>
        </div>
      </div>
    </div>
  );
}
