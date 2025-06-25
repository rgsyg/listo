import MainContent from "./components/MainContent";
import NewTodoForm from "./components/NewTodoForm";
import SideNav from "./components/SideNav";
import UpdateTodo from "./components/UpdateTodo";

function App() {
  return (
    <div className="bg-dark min-vh-100">
      <div className="row min-vh-100 g-0 row-cols-2">
        <SideNav />
        <MainContent />
      </div>
      <footer className="text-white bg-dark text-center py-2">
        <small>&copy; 2025 Rigor. All rights reserved.</small>
      </footer>
      <NewTodoForm />
      <UpdateTodo />
    </div>
  );
}

export default App;
