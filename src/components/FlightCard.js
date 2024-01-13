import Airplane from "../assets/images/airplane.png";
import AnadoluJetImage from "../assets/images/AnadoluJet.png";
import PegasusImage from "../assets/images/Pegasus.png";
import SunExpressImage from "../assets/images/SunExpress.png";
import TurkishAirlinesImage from "../assets/images/TurkishAirlines.png";

const airlineImageMap = {
  AnadoluJet: AnadoluJetImage,
  SunExpress: SunExpressImage,
  "Pegasus Airlines": PegasusImage,
  "Turkish Airlines": TurkishAirlinesImage,
};

const FlightCard = ({ flight }) => {
  const {
    departureTime,
    arrivalTime,
    departureAirport,
    arrivalAirport,
    airline,
    duration,
    direct,
    price,
  } = flight;

  const airlineImageUrl = airlineImageMap[airline];

  return (
    <div className="w-full bg-white shadow-md rounded-lg px-8 py-12 flex items-center justify-center">
      <div className="flex gap-2  w-1/3 items-center">
        {airlineImageUrl && (
          <img
            src={airlineImageUrl}
            className="w-8 h-8"
            alt={`${airline} Logo`}
          />
        )}
        <div className="text-lg font-semibold">{airline}</div>
      </div>
      <div className="flex w-1/3">
        <div className="text-center">
          <div className="text-lg font-semibold">
            {departureTime.split("T")[1]}
          </div>
          <div className="text-sm text-gray-600">{departureAirport}</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>{direct ? "Direct" : "Undirect"}</p>
          <div className="flex items-center">
            <hr className="border-t border-gray-300 mx-2 w-16" />
            <img src={Airplane} className="text-yellow-500 w-6 h-6" />
            <hr className="border-t border-gray-300 mx-2 w-16" />
          </div>
          <p>{duration}</p>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold">
            {arrivalTime.split("T")[1]}
          </div>
          <div className="text-sm text-gray-600">{arrivalAirport}</div>
        </div>
      </div>
      <p className="font-bold text-red-400 text-xl w-1/3 text-end">{price} ₺</p>
    </div>
  );
};

export default FlightCard;
