import Modal from "bootstrap/js/dist/modal";
import type { Priority, Todo } from "../store/useTodoStore";
import useTodoStore from "../store/useTodoStore";

function formDataToObject(formData: FormData): Todo {
  const obj: any = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

export default function UpdateTodo() {
  const { todo, setTodo, updateTodo } = useTodoStore();

  return (
    <div className="modal fade" id="updateModal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">UPDATE TO-DO</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form
              id="todo-update-form"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const todoData = formDataToObject(formData);
                if (todoData.due_date === "") todoData.due_date = null;
                await updateTodo({
                  ...todoData,
                  id: todo.id,
                  is_completed: todo.is_completed,
                  archived: todo.archived,
                });
                const updateModal = document.getElementById("updateModal");
                if (updateModal) {
                  const modal = Modal.getOrCreateInstance(updateModal);
                  modal.hide();
                }
              }}
            >
              <div className="mb-3">
                <label htmlFor="todo-title" className="col-form-label">
                  Title:
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  id="todo-title"
                  value={todo.title}
                  onChange={(e) => setTodo({ title: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="todo-description" className="col-form-label">
                  Description:
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  id="todo-description"
                  value={todo.description}
                  onChange={(e) => setTodo({ description: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="due_date" className="col-form-label me-2">
                  Due Date:
                </label>
                <input
                  type="date"
                  id="due_date"
                  name="due_date"
                  min={new Date().toISOString().split("T")[0]}
                  value={
                    todo.due_date
                      ? new Date(todo.due_date).toLocaleDateString("en-CA")
                      : ""
                  }
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    setTodo({ due_date: selectedDate });
                  }}
                />
              </div>

              <label className="col-form-label">Priority:</label>
              <ul className="list-group">
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="radio"
                    name="priority"
                    value="low"
                    id="priority-low"
                    checked={todo.priority === "low"}
                    onChange={(e) =>
                      setTodo({ priority: e.target.value as Priority })
                    }
                  />
                  <label className="form-check-label" htmlFor="priority-low">
                    Low
                  </label>
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="radio"
                    name="priority"
                    value="med"
                    id="priority-med"
                    checked={todo.priority === "med"}
                    onChange={(e) =>
                      setTodo({ priority: e.target.value as Priority })
                    }
                  />
                  <label className="form-check-label" htmlFor="priority-med">
                    Med
                  </label>
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="radio"
                    name="priority"
                    value="high"
                    id="priority-high"
                    checked={todo.priority === "high"}
                    onChange={(e) =>
                      setTodo({ priority: e.target.value as Priority })
                    }
                  />
                  <label className="form-check-label" htmlFor="priority-high">
                    High
                  </label>
                </li>
              </ul>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              form="todo-update-form"
            >
              Update to-do
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
