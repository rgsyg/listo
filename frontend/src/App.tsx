import MainContent from "./components/MainContent";
import SideNav from "./components/SideNav";

function App() {
  return (
    <div className="bg-dark min-vh-100">
      <div className="row min-vh-100 g-xl-0">
        <SideNav />
        <MainContent />
      </div>
    </div>
  );
}

export default App;
