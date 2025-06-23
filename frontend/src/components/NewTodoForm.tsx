import type { NewTodo } from "../store/useTodoStore";
import useTodoStore from "../store/useTodoStore";

function formDataToObject(formData: FormData): NewTodo {
  const obj: any = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

export default function NewTodoForm() {
  const { createTodo } = useTodoStore();

  return (
    <div className="modal fade" id="todoModal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">ADD NEW TO-DO</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form
              id="todo-form"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const todoData = formDataToObject(formData);
                await createTodo(todoData);
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
                    defaultChecked
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
              form="todo-form"
              data-bs-dismiss="modal"
            >
              Create to-do
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
