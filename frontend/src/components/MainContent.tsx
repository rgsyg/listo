export default function MainContent() {
  return (
    <div className="bg-light col p-4">
      <header>
        <h2>Tasks</h2>
        <hr className="opacity-100 bg-black" style={{ height: "2px" }} />
      </header>
      <div className="row m-0 gap-5">
        <div className="col m-0">
          <div
            className="card p-3 fw-bold border border-black border-2 fs-5"
            style={{ backgroundColor: "orange", boxShadow: "8px 6px" }}
          >
            TO DO
          </div>
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
