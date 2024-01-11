import "./App.css";
import SearchCard from "./components/SearchCard";

function App() {
  return (
    <div className="w-full h-screen bg-zinc-100">
      <nav className="flex items-center h-24 bg-white">
        <p className="text-teal-700 font-bold text-3xl ml-12">Flightly</p>
      </nav>
      <SearchCard />
    </div>
  );
}

export default App;
