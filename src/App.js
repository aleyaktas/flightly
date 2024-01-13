import React, { useState } from "react";
import FlightCard from "./components/FlightCard";
import SearchCard from "./components/SearchCard";
import { mockFlights } from "./api/mockApi";
import "./App.css";

function App() {
  const [flights, setFlights] = useState(mockFlights);

  return (
    <div className="w-full h-screen overflow-auto bg-zinc-100">
      <nav className="flex items-center h-24 bg-white">
        <p className="text-teal-700 font-bold text-3xl ml-12">Flightly</p>
      </nav>
      <div className="flex gap-10 mx-20">
        <SearchCard
          onSearch={(selectedFlight) => console.log(selectedFlight)}
        />
        <div className="flex flex-col gap-8 w-full">
          <p className="ml-auto text-gray-500">Sort by</p>
          <div className="container mx-auto mt-10">
            <div className="flex flex-col gap-8 w-full rounded-md">
              {flights.map((flight, index) => (
                <React.Fragment key={index}>
                  <FlightCard flight={flight} />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
