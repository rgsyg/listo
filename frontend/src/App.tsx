import MainContent from "./components/MainContent";
import NewTodoForm from "./components/NewTodoForm";
import SideNav from "./components/SideNav";

function App() {
  return (
    <div className="bg-dark min-vh-100">
      <div className="row min-vh-100 g-0">
        <SideNav />
        <MainContent />
      </div>
      <NewTodoForm />
    </div>
  );
}

export default App;
