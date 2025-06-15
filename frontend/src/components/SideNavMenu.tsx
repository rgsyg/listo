export default function SideNavMenu() {
  return (
    <div className="d-grid gap-3 mt-5">
      <button className="btn btn-dark fs-4 w-100 py-2 text-start">
        <i className="bi bi-check2-square pe-4" />
        <span>Tasks</span>
      </button>
      <button className="btn btn-dark fs-4 w-100 py-2 text-start">
        <i className="bi bi-gear pe-4" />
        <span>Settings</span>
      </button>
    </div>
  );
}
