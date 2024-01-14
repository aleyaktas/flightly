import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { ReactComponent as NotFound } from "./assets/icons/NotFound.svg";
import Loading from "./assets/gifs/loading.gif";
import { mockFlights } from "./api/mockApi";
import FlightCard from "./components/FlightCard";
import FilterDropdown from "./components/FilterDropdown";
import SearchCard from "./components/SearchCard";
import { showMessage } from "./helpers/showMessage";
import "./App.css";
import { sortFlights } from "./helpers/sortFlights";

function App() {
  const [goingFlights, setGoingFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [oneWay, setOneWay] = useState(false);
  const [selectedGoingFlight, setSelectedGoingFlight] = useState({});
  const [selectedReturnFlight, setSelectedReturnFlight] = useState({});
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(
    "You haven't searched yet. You can search to see flights!"
  );

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
    setLoading(true);
    setTimeout(() => {
      setSelectedGoingFlight({});
      setSelectedReturnFlight({});
      const filteredGoingFlights = filterFlights(data);
      setGoingFlights(filteredGoingFlights);
      if (data.returnDate !== "") {
        const filteredReturnFlights = filterFlights(data, true);
        setReturnFlights(filteredReturnFlights);
      } else {
        setReturnFlights([]);
      }
      if (goingFlights.length === 0 && returnFlights.length === 0) {
        setMessages(
          "No flights were found according to the information you were looking for."
        );
      }
      setLoading(false);
    }, 1000);
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

  const handleSort = (sortBy) => {
    const { value } = sortBy;
    if (!oneWay) {
      if (!selectedGoingFlight.id) {
        const sortedFlights = sortFlights(goingFlights, value);
        setGoingFlights(sortedFlights);
      } else {
        const sortedFlights = sortFlights(returnFlights, value);
        setReturnFlights(sortedFlights);
      }
    } else {
      const sortedFlights = sortFlights(goingFlights, value);
      setGoingFlights(sortedFlights);
    }
  };

  return (
    <>
      <ToastContainer newestOnTop={true} />
      <div className="w-full overflow-x-scroll h-screen overflow-auto bg-zinc-100 lg:w-full">
        <nav className="flex items-center h-24 bg-white w-full ">
          <p className="text-teal-700 font-bold text-3xl ml-12">Flightly</p>
        </nav>
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-10 mx-6 md:mx-12 lg:mx-16">
          <SearchCard
            onSearch={handleSearch}
            oneWay={oneWay}
            setOneWay={setOneWay}
          />
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full lg:container mx-auto">
              <FilterDropdown onSort={handleSort} />
              <div className="mb-2 py-2 rounded-t-md w-full bg-teal-50 border border-teal-400 text-center text-black font-bold">
                {oneWay
                  ? "Departure Flights"
                  : selectedGoingFlight.id
                  ? "Return Flights"
                  : "Departure Flights"}
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
                {goingFlights.length === 0 && returnFlights.length === 0 && (
                  <div className="flex flex-col gap-2 items-center justify-center min-h-96">
                    {!loading ? (
                      <>
                        <p className="text-lg font-semibold text-teal-900 mx-10 text-center">
                          {messages}
                        </p>
                        <NotFound className="w-52 sm:w-64 md:w-80 lg:w-96 h-auto" />
                      </>
                    ) : (
                      <div>
                        <img src={Loading} width={150} height={150} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
