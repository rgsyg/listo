import { useEffect } from "react";
import useTodoStore, { type Todo } from "../store/useTodoStore";
import { useLocation } from "react-router-dom";
import Masonry from "react-masonry-css";
import TodoCard from "./TodoCard";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function MainContent() {
  const { pathname } = useLocation();
  const { todos, fetchTodos } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const archivedTodos: Todo[] = todos.filter((todo) => todo.archived);
  const finishedTodos: Todo[] = todos.filter((todo) => todo.is_completed);

  return (
    <div className="bg-light col-9 p-4">
      <header>
        <h2>{pathname === "/" ? "Tasks" : "Archived Tasks"}</h2>
        <hr className="opacity-100 bg-black" style={{ height: "2px" }} />
      </header>
      {pathname === "/" ? (
        <div className="row m-0 row-cols-3">
          <div className="col m-0 d-flex flex-column gap-4">
            <div
              className="card p-3 fw-bold border border-black border-2 fs-5"
              style={{ backgroundColor: "orange", boxShadow: "8px 6px" }}
            >
              TO DO
            </div>
            {todos.map(
              (todo: Todo) =>
                !todo.archived && !todo.is_completed && <TodoCard todo={todo} />
            )}
          </div>
          <div className="col m-0 d-flex flex-column gap-4">
            <div
              className="card p-3 fw-bold border border-black border-2 fs-5"
              style={{ backgroundColor: "lightskyblue", boxShadow: "8px 6px" }}
            >
              IN PROGRESS
            </div>
          </div>
          <div className="col m-0 d-flex flex-column gap-4">
            <div
              className="card p-3 fw-bold border border-black border-2 fs-5"
              style={{ backgroundColor: "lightgreen", boxShadow: "8px 6px" }}
            >
              COMPLETE
            </div>
            {finishedTodos.map(
              (todo: Todo) => !todo.archived && <TodoCard todo={todo} />
            )}
          </div>
        </div>
      ) : archivedTodos.length === 0 ? (
        <div className="">No archived to-dos</div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {archivedTodos.map((todo: Todo) => (
            <TodoCard todo={todo} />
          ))}
        </Masonry>
      )}
    </div>
  );
}
