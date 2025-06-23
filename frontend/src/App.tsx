import MainContent from "./components/MainContent";
import NewTodoForm from "./components/NewTodoForm";
import SideNav from "./components/SideNav";
import UpdateTodo from "./components/UpdateTodo";

function App() {
  return (
    <div className="bg-dark min-vh-100 overflow-x-scroll">
      <div className="row min-vh-100 g-0">
        <SideNav />
        <MainContent />
      </div>
      <NewTodoForm />
      <UpdateTodo />
    </div>
  );
}

export default App;
