import airplane from "../assets/images/airplane.png";

const FlightCard = ({ flights }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
      {flights.map((flight, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-gray-500 text-sm">
              {flight.date} - {flight.type}
            </div>
            <div className="text-lg font-semibold">{flight.departureTime}</div>
            <div className="text-sm text-gray-600">
              {flight.departureAirport.name} ({flight.departureAirport.code})
            </div>
          </div>

          <div className="flex items-center">
            <hr className="border-t border-gray-300 mx-2 w-16" />
            <img className="text-yellow-500 w-6 h-6" src={airplane} />
            <hr className="border-t border-gray-300 mx-2 w-16" />
          </div>

          <div className="space-y-1 text-right">
            <div className="text-lg font-semibold">{flight.arrivalTime}</div>
            <div className="text-sm text-gray-600">
              {flight.arrivalAirport.name} ({flight.arrivalAirport.code})
            </div>
          </div>

          <div className="absolute top-2 right-2 text-xs text-gray-500">
            {flight.duration} {flight.direct ? "Direct" : ""}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightCard;
