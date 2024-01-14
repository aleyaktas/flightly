import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { turkishAirports } from "../api/mockApi";

const SearchCard = ({ onSearch, oneWay, setOneWay }) => {
  const [today, setToday] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    const todayFormatted = new Date().toISOString().split("T")[0];
    setToday(todayFormatted);
  }, []);

  const onSubmit = (data) => {
    onSearch(data, oneWay);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-row w-full items-center mt-8 lg:flex-col gap-4 lg:w-64 lg:mt-20"
    >
      <p className="font-bold text-lg hidden lg:block">Your Search</p>
      <div className="flex-auto min-w-32 w-full">
        <label
          htmlFor="from"
          className="block text-sm font-medium text-gray-700"
        >
          From
        </label>
        <select
          id="from"
          name="from"
          {...register("from", { required: "Please select a city" })}
          className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:outline-teal-700 focus:outline-1"
        >
          <option value="">Select City</option>
          {turkishAirports.map((airport, index) => (
            <option key={index} value={airport.code}>
              {airport.city} ({airport.code})
            </option>
          ))}
        </select>
        {errors.from && (
          <span className="text-red-500 text-sm">{errors.from.message}</span>
        )}
      </div>

      <div className="flex-auto min-w-32 w-full">
        <label htmlFor="to" className="block text-sm font-medium text-gray-700">
          To
        </label>
        <select
          id="to"
          name="to"
          {...register("to", { required: "Please select a city" })}
          className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:outline-teal-700 focus:outline-1"
        >
          <option value="">Select City</option>
          {turkishAirports.map((airport, index) => (
            <option key={index} value={airport.code}>
              {airport.city} ({airport.code})
            </option>
          ))}
        </select>
        {errors.to && (
          <span className="text-red-500 text-sm">{errors.to.message}</span>
        )}
      </div>

      <div className="flex-auto min-w-32 w-full">
        <label
          htmlFor="departure"
          className="block text-sm font-medium text-gray-700"
        >
          Departure
        </label>
        <input
          type="date"
          id="departure"
          name="departureDate"
          min={today}
          {...register("departureDate", {
            required: "Please select a departure date",
            validate: (value) =>
              new Date(value) >= new Date() ||
              "Departure date must be today or in the future",
          })}
          className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:outline-teal-700 focus:outline-1"
        />
        {errors.departureDate && (
          <span className="text-red-500 text-sm">
            {errors.departureDate.message}
          </span>
        )}
      </div>

      {!oneWay && (
        <div className="flex-auto min-w-32 w-full">
          <label
            htmlFor="return"
            className="block text-sm font-medium text-gray-700"
          >
            Return
          </label>
          <input
            type="date"
            id="return"
            name="returnDate"
            min={getValues("departureDate") || today}
            {...register("returnDate", {
              validate: (value) =>
                new Date(value) >= new Date(getValues("departureDate")) ||
                "Return date must be equal to or after departure date",
            })}
            className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:outline-teal-700 focus:outline-1"
          />
          {errors.returnDate && (
            <span className="text-red-500 text-sm">
              {errors.returnDate.message}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center">
        <input
          id="one-way"
          type="checkbox"
          checked={oneWay}
          onChange={() => setOneWay(!oneWay)}
          className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
        />
        <label
          htmlFor="one-way"
          className="ml-2 block text-sm font-medium text-gray-700"
        >
          One way
        </label>
      </div>

      <button
        type="submit"
        className="bg-teal-500 mt-auto text-white h-12 text-center rounded-md shadow-sm hover:bg-teal-600 w-full w-min-32 px-4 lg:flex-auto"
      >
        Search
      </button>
    </form>
  );
};

export default SearchCard;

SearchCard.propTypes = {
  onSearch: PropTypes.func.isRequired,
  oneWay: PropTypes.bool.isRequired,
  setOneWay: PropTypes.func.isRequired,
};
