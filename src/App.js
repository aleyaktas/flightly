import React, { useState } from "react";
import FlightCard from "./components/FlightCard";
import SearchCard from "./components/SearchCard";
import { mockFlights } from "./api/mockApi";
import "./App.css";

function App() {
  const [flights, setFlights] = useState([]);
  const [goingFlights, setGoingFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [oneWay, setOneWay] = useState(false);
  const [selectedGoingFlight, setSelectedGoingFlight] = useState({});
  const [selectedReturnFlight, setSelectedReturnFlight] = useState({});

  const filterFlights = (data, isReturnFlight = false) => {
    const airportFrom = isReturnFlight ? data.to : data.from;
    const airportTo = isReturnFlight ? data.from : data.to;

    return mockFlights.filter((flight) => {
      const isMatchingDeparture = flight.departureAirport === airportFrom;
      const isMatchingArrival = flight.arrivalAirport === airportTo;
      const isMatchingDepartureDate =
        new Date(flight.departureTime).toLocaleDateString() ===
        new Date(
          isReturnFlight ? data.returnDate : data.departureDate
        ).toLocaleDateString();

      return (
        isMatchingDeparture && isMatchingArrival && isMatchingDepartureDate
      );
    });
  };

  const handleSearch = (data) => {
    const filteredGoingFlights = filterFlights(data);
    setGoingFlights(filteredGoingFlights);
    if (data.returnDate !== "") {
      const filteredReturnFlights = filterFlights(data, true);
      setReturnFlights(filteredReturnFlights);
    } else {
      setReturnFlights([]);
    }
  };

  const handleSelect = (flight) => {
    if (!oneWay && !selectedGoingFlight.id) {
      setSelectedGoingFlight(flight);
    } else if (!oneWay && selectedGoingFlight.id) {
      setSelectedReturnFlight(flight);
    }
  };

  return (
    <div className="w-full h-screen overflow-auto bg-zinc-100">
      <nav className="flex items-center h-24 bg-white">
        <p className="text-teal-700 font-bold text-3xl ml-12">Flightly</p>
      </nav>
      <div className="flex gap-10 mx-20">
        <SearchCard
          onSearch={handleSearch}
          oneWay={oneWay}
          setOneWay={setOneWay}
        />
        <div className="flex flex-col gap-2 w-full">
          <p className="ml-auto text-gray-500">Sort by</p>
          <div className="container mx-auto">
            <div className="py-2 rounded-t-md w-full bg-teal-700 text-center text-white font-bold">
              {!selectedGoingFlight.id ? "Departure Flights" : "Return Flights"}
            </div>
            <div className="flex flex-col gap-8 w-full rounded-md">
              {selectedGoingFlight.id && (
                <FlightCard
                  flight={selectedGoingFlight}
                  onRemove={() =>
                    !selectedReturnFlight.id && setSelectedGoingFlight({})
                  }
                />
              )}
              {selectedReturnFlight.id && (
                <FlightCard
                  flight={selectedReturnFlight}
                  onRemove={() => setSelectedReturnFlight({})}
                />
              )}
              {!selectedGoingFlight.id &&
                goingFlights.map((flight, index) => (
                  <React.Fragment key={index}>
                    <FlightCard flight={flight} onSelect={handleSelect} />
                  </React.Fragment>
                ))}
              {!oneWay &&
                selectedGoingFlight.id &&
                !selectedReturnFlight.id &&
                returnFlights.map((flight, index) => (
                  <React.Fragment key={index}>
                    <FlightCard flight={flight} onSelect={handleSelect} />
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
