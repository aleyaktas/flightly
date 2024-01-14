import { getDurationInMinutes } from "./getDurationInMinutes";

export const sortFlights = (flights, sortBy) => {
  const sortByDepartureTime = (a, b) =>
    new Date(a.departureTime) - new Date(b.departureTime);
  const sortByArrivalTime = (a, b) =>
    new Date(a.arrivalTime) - new Date(b.arrivalTime);
  const sortByDuration = (a, b) =>
    getDurationInMinutes(a.duration) - getDurationInMinutes(b.duration);
  const sortByPrice = (a, b) => a.price - b.price;

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
