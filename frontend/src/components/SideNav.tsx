import Modal from "bootstrap/js/dist/modal";
import SideNavMenu from "./SideNavMenu";

export default function SideNav() {
  return (
    <div
      className="bg-dark col-3 p-4 text-light d-flex flex-column justify-content-between sticky-top"
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <section>
        <h2>Listo</h2>
        <hr className="bg-light opacity-100" style={{ height: "2px" }} />
        <SideNavMenu />
      </section>
      <button
        className="btn btn-success mb-4 fs-4 py-3 fw-bold border border-black border-2"
        onClick={() => {
          const todoModal = document.getElementById("todoModal");
          if (todoModal) {
            const modal = Modal.getOrCreateInstance(todoModal);
            modal.show();
          }
        }}
      >
        NEW TO-DO
      </button>
    </div>
  );
}
