import React, { useEffect, useState } from "react";
import FlightCard from "./components/FlightCard";
import SearchCard from "./components/SearchCard";
import { mockFlights } from "./api/mockApi";
import "./App.css";

function App() {
  const [flights, setFlights] = useState([]);
  const [goingFlights, setGoingFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [oneWay, setOneWay] = useState(true);
  const [departure, setDeparture] = useState(true);

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
      const isMatchingDirect = isReturnFlight
        ? true
        : data.returnDate === ""
        ? flight.direct
        : true;

      return (
        isMatchingDeparture &&
        isMatchingArrival &&
        isMatchingDepartureDate &&
        isMatchingDirect
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

  useEffect(() => {
    if (departure && oneWay) {
      setFlights(goingFlights);
    } else if (!departure && !oneWay) {
      setFlights(returnFlights);
    } else if (departure && !oneWay) {
      setFlights(goingFlights);
    }
  }, [departure, goingFlights, oneWay, returnFlights]);

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
            <div className="flex gap-2 justify-center py-4">
              <button
                className={`px-4 py-2 rounded-md ${
                  departure
                    ? "bg-teal-500 text-white"
                    : "bg-white text-teal-800"
                }`}
                onClick={() => setDeparture(true)}
              >
                Departure
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  !departure
                    ? "bg-teal-500 text-white"
                    : "bg-white text-teal-800"
                }`}
                disabled={oneWay}
                onClick={() => setDeparture(false)}
              >
                Return
              </button>
            </div>
            <div className="flex flex-col gap-8 w-full rounded-md">
              {flights.length > 0 ? (
                flights.map((flight, index) => (
                  <React.Fragment key={index}>
                    <FlightCard flight={flight} />
                  </React.Fragment>
                ))
              ) : (
                <div className="bg-white h-52"> Flights not find </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
