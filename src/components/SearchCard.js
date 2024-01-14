import { useEffect, useState } from "react";
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
      className="flex flex-col gap-4 w-64 mt-20"
    >
      <p className="font-bold text-lg">Your Search</p>
      <div>
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

      <div>
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

      <div className="flex items-center">
        <input
          id="one-way"
          type="checkbox"
          checked={oneWay}
          onChange={() => setOneWay(!oneWay)}
          className="w-4 h-4 bg-gray-100 border-gray-300 rounded "
        />
        <label
          htmlFor="one-way"
          className="ml-2 block text-sm font-medium text-gray-700"
        >
          One way
        </label>
      </div>

      <div>
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
        <div>
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

      <button
        type="submit"
        className="bg-teal-800 text-white h-12 text-center rounded-md shadow-sm hover:bg-teal-900"
      >
        Search
      </button>
    </form>
  );
};

export default SearchCard;
