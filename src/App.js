import React, { useState } from "react";
import FlightCard from "./components/FlightCard";
import SearchCard from "./components/SearchCard";
import { mockFlights } from "./api/mockApi";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { showMessage } from "./helpers/showMessage";
import DropdownMenu from "./components/Dropdown";

function App() {
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

  const handleBuyTicket = () => {
    showMessage("Your ticket has been purchased successfully", "success");
    setSelectedGoingFlight({});
    setSelectedReturnFlight({});
  };

  const handleSelect = (flight) => {
    if (!oneWay && !selectedGoingFlight.id) {
      setSelectedGoingFlight(flight);
    } else if (!oneWay && selectedGoingFlight.id) {
      setSelectedReturnFlight(flight);
    } else if (oneWay && !selectedGoingFlight.id) {
      setSelectedGoingFlight(flight);
    }
  };

  const sortByDepartureTime = (a, b) =>
    new Date(a.departureTime) - new Date(b.departureTime);
  const sortByArrivalTime = (a, b) =>
    new Date(a.arrivalTime) - new Date(b.arrivalTime);
  const sortByDuration = (a, b) =>
    getDurationInMinutes(a.duration) - getDurationInMinutes(b.duration);
  const sortByPrice = (a, b) => a.price - b.price;

  const getDurationInMinutes = (duration) => {
    const [hours, minutes] = duration.split("h").map((part) => parseInt(part));
    return hours * 60 + minutes;
  };

  const sortFlights = (flights, sortBy) => {
    switch (sortBy) {
      case "departureTime":
        return flights.slice().sort(sortByDepartureTime);
      case "arrivalTime":
        return flights.slice().sort(sortByArrivalTime);
      case "duration":
        return flights.slice().sort(sortByDuration);
      case "price":
        return flights.slice().sort(sortByPrice);
      default:
        return flights.slice();
    }
  };

  const handleSort = (sortBy) => {
    if (!oneWay) {
      if (!selectedGoingFlight.id) {
        const sortedFlights = sortFlights(goingFlights, sortBy);
        setGoingFlights(sortedFlights);
      } else {
        const sortedFlights = sortFlights(returnFlights, sortBy);
        setReturnFlights(sortedFlights);
      }
    } else {
      const sortedFlights = sortFlights(goingFlights, sortBy);
      setGoingFlights(sortedFlights);
    }
  };

  return (
    <>
      <ToastContainer newestOnTop={true} />
      <div className="w-full overflow-x-scroll h-screen overflow-auto bg-zinc-100">
        <nav className="flex items-center h-24 bg-white">
          <p className="text-teal-700 font-bold text-3xl ml-12">Flightly</p>
        </nav>
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-10 mx-12 lg:mx-16">
          <SearchCard
            onSearch={handleSearch}
            oneWay={oneWay}
            setOneWay={setOneWay}
          />
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full lg:container mx-auto">
              <div className="mt-4 mb-2">
                <DropdownMenu
                  onSortChange={(sortBy) => handleSort(sortBy)}
                  className="ml-auto"
                />
              </div>
              <div className="mb-2 py-2 rounded-t-md w-full bg-teal-50 border border-teal-400 text-center text-black font-bold">
                {!selectedGoingFlight.id
                  ? "Departure Flights"
                  : "Return Flights"}
              </div>
              <div className="flex flex-col gap-8 w-full rounded-md">
                {selectedGoingFlight.id && (
                  <FlightCard
                    flight={selectedGoingFlight}
                    onRemove={
                      !selectedReturnFlight.id
                        ? () => setSelectedGoingFlight({})
                        : undefined
                    }
                  />
                )}
                {selectedReturnFlight.id && (
                  <FlightCard
                    flight={selectedReturnFlight}
                    onRemove={() => setSelectedReturnFlight({})}
                  />
                )}
                {(selectedGoingFlight.id && selectedReturnFlight.id) ||
                (oneWay && selectedGoingFlight.id) ? (
                  <button
                    onClick={handleBuyTicket}
                    className="px-4 py-2 bg-gradient-to-l from-teal-500 to-teal-600 w-fit rounded-md text-white mx-auto"
                  >
                    Buy Ticket
                  </button>
                ) : null}

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
    </>
  );
}

export default App;
