import PropTypes from "prop-types";
import Airplane from "../assets/images/airplane.png";
import AnadoluJetImage from "../assets/images/AnadoluJet.png";
import PegasusImage from "../assets/images/Pegasus.png";
import SunExpressImage from "../assets/images/SunExpress.png";
import TurkishAirlinesImage from "../assets/images/TurkishAirlines.png";
import { ReactComponent as CloseIcon } from "../assets/icons/Close.svg";

const airlineImageMap = {
  AnadoluJet: AnadoluJetImage,
  SunExpress: SunExpressImage,
  "Pegasus Airlines": PegasusImage,
  "Turkish Airlines": TurkishAirlinesImage,
};

const FlightCard = ({ flight, onSelect, onRemove }) => {
  const {
    departureTime,
    arrivalTime,
    departureAirport,
    arrivalAirport,
    airline,
    duration,
    price,
  } = flight;
  console.log(onRemove);
  const airlineImageUrl = airlineImageMap[airline];
  return (
    <div
      className={`w-full bg-white shadow-md rounded-lg px-4 py-8 lg:p-12 flex flex-col min-[640px]:flex-row gap-2 items-center justify-center cursor-pointer relative ${
        !onSelect && "border border-teal-500"
      }`}
      onClick={() => onSelect && onSelect(flight)}
    >
      {!onSelect && (
        <button
          className={`absolute top-2 right-2 ${!onRemove && "opacity-50"}`}
          onClick={onRemove}
        >
          <CloseIcon className="w-6 h-6 text-teal-400 hover:text-teal-500" />
        </button>
      )}
      <div className="flex gap-2 w-full lg:w-1/3 items-center justify-center">
        {airlineImageUrl && (
          <img
            src={airlineImageUrl}
            className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8"
            alt={`${airline} Logo`}
          />
        )}
        <div className="text-lg font-semibold">{airline}</div>
      </div>
      <div className="flex justify-center w-full lg:w-1/3">
        <div className="text-center">
          <div className="text-lg font-semibold">
            {departureTime.split("T")[1]}
          </div>
          <div className="text-sm text-gray-600">{departureAirport}</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center">
            <hr className="border-t border-gray-300 mx-2 w-14 lg:w-16" />
            <img
              src={Airplane}
              className="text-yellow-500 w-4 h-4 lg:w-6 lg:h-6"
            />
            <hr className="border-t border-gray-300 mx-2 w-14 lg:w-16" />
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
      <p className="font-bold text-rose-800 text-lg lg:text-xl w-full lg:w-1/3 text-end">
        {price} ₺
      </p>
    </div>
  );
};

export default FlightCard;

FlightCard.propTypes = {
  flight: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onRemove: PropTypes.func,
};
