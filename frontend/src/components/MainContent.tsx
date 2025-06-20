import { useEffect } from "react";
import useTodoStore, { type Priority, type Todo } from "../store/useTodoStore";

export default function MainContent() {
  const { todos, fetchTodos } = useTodoStore();

  const createBadge = (priority: Priority) => {
    if (priority === "low") {
      return <span className="badge text-bg-info">Low</span>
    } else if (priority === "med") {
      return <span className="badge text-bg-warning">Med</span>
    } else {
      return <span className="badge text-bg-danger">High</span>
    }
  }

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="bg-light col p-4">
      <header>
        <h2>Tasks</h2>
        <hr className="opacity-100 bg-black" style={{ height: "2px" }} />
      </header>
      <div className="row m-0 gap-5">
        <div className="col m-0 d-flex flex-column gap-4">
          <div
            className="card p-3 fw-bold border border-black border-2 fs-5"
            style={{ backgroundColor: "orange", boxShadow: "8px 6px" }}
          >
            TO DO
          </div>
          {todos.map((todo: Todo) => (
            <div
              className="card p-3 fw-bold border border-black border-2 fs-5"
              style={{ boxShadow: "8px 6px" }}
              key={todo.id}
            >
              <div className="card-body p-0">
                <h5 className="card-title">
                  <span className="fw-bold">{todo.title}</span>
                </h5>
                <div className="d-flex justify-content-between align-items-center fs-6">
                  {createBadge(todo.priority)}
                  <p className="text-muted m-0 fw-normal" style={{ fontSize: "0.90rem" }}>{"Created on " + new Date(todo.created_at).toLocaleString().split(",")[0]}</p>
                </div>
                <p className="card-text fw-normal pb-3 pt-2">{todo.description}</p>
                <div className="row g-0 align-items-end">
                  <div className="col d-flex gap-3">
                    <button
                      className="btn btn-light border border-2 border-black"
                      style={{ padding: "0.10rem 0.45rem" }}
                    >
                      <i
                        className="bi bi-check2"
                        style={{ fontSize: "1rem" }}
                      />
                    </button>
                    <button
                      className="btn btn-light border border-2 border-black"
                      style={{ padding: "0.10rem 0.45rem" }}
                    >
                      <i
                        className="bi bi-pencil"
                        style={{ fontSize: "1rem" }}
                      />
                    </button>
                    <button
                      className="btn btn-light border border-2 border-black"
                      style={{ padding: "0.10rem 0.45rem" }}
                    >
                      <i
                        className="bi bi-three-dots"
                        style={{ fontSize: "1rem" }}
                      />
                    </button>
                  </div>
                  <div className="col text-end text-muted fw-normal" style={{ fontSize: "0.90rem" }}>
                    {todo.due_date
                      ? "Due on " + new Date(todo.due_date).toLocaleString().split(",")[0]
                      : "No deadline"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col m-0">
          <div
            className="card p-3 fw-bold border border-black border-2 fs-5"
            style={{ backgroundColor: "lightskyblue", boxShadow: "8px 6px" }}
          >
            IN PROGRESS
          </div>
        </div>
        <div className="col m-0">
          <div
            className="card p-3 fw-bold border border-black border-2 fs-5"
            style={{ backgroundColor: "lightgreen", boxShadow: "8px 6px" }}
          >
            COMPLETE
          </div>
        </div>
      </div>
    </div>
  );
}
