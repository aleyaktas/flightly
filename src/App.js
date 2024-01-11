import "./App.css";
import FlightCard from "./components/FlightCard";
import SearchCard from "./components/SearchCard";

function App() {
  const flightDetails = [
    {
      date: "June 10, 2023",
      type: "Departure",
      departureTime: "10:45",
      arrivalTime: "13:55",
      departureAirport: { name: "London Stansted", code: "STN" },
      arrivalAirport: { name: "Stockholm Arlanda", code: "ARN" },
      duration: "2h 10m",
      direct: true,
    },
    {
      date: "August 18, 2023",
      type: "Return",
      departureTime: "16:20",
      arrivalTime: "17:55",
      departureAirport: { name: "Stockholm Arlanda", code: "ARN" },
      arrivalAirport: { name: "London Stansted", code: "STN" },
      duration: "2h 10m",
      direct: true,
    },
  ];

  return (
    <div className="w-full h-screen overflow-auto bg-zinc-100">
      <nav className="flex items-center h-24 bg-white">
        <p className="text-teal-700 font-bold text-3xl ml-12">Flightly</p>
      </nav>
      <div className="flex gap-10 mx-20">
        <SearchCard />
        <div className="flex flex-col gap-8 w-full">
          <p className="ml-auto text-gray-500">Sort by</p>
          <div className="flex flex-col bg-white w-full rounded-md">
            <div className="container mx-auto mt-10">
              <FlightCard flights={flightDetails} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
