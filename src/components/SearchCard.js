import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { turkishAirports } from "../api/mockApi";
import Select from "react-select";

const SearchCard = ({ onSearch, oneWay, setOneWay }) => {
  const [today, setToday] = useState();

  const {
    control,
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
      className="grid grid-cols-card auto-rows-card justify-center w-full mt-8 lg:flex lg:flex-col lg:justify-normal gap-4 lg:w-64 lg:mt-20"
    >
      <p className="font-bold text-lg hidden lg:block">Your Search</p>
      <div>
        <label
          htmlFor="from"
          className="block text-sm font-medium text-gray-700"
        >
          From
        </label>

        <Controller
          name="from"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Select
              {...field}
              classNamePrefix="select"
              isClearable
              isSearchable
              options={turkishAirports}
              value={turkishAirports.find((c) => c.value === field.value)}
              onChange={(val) => field.onChange(val ? val.value : "")}
            />
          )}
        />
        {errors.from && (
          <p className="text-red-500 text-sm w-24 lg:w-full">
            {errors.from.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="to" className="block text-sm font-medium text-gray-700">
          To
        </label>
        <Controller
          name="to"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Select
              {...field}
              classNamePrefix="select"
              isClearable
              isSearchable
              options={turkishAirports}
              value={turkishAirports.find((c) => c.value === field.value)}
              onChange={(val) => field.onChange(val ? val.value : "")}
            />
          )}
        />
        {errors.to && (
          <p className="text-red-500 text-sm w-24 lg:w-full">
            {errors.to.message}
          </p>
        )}
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
          className="pl-2 block w-full h-9 border-gray-300 rounded-md shadow-sm focus:outline-teal-700 focus:outline-1"
        />
        <div className="flex mt-2 lg:self-start min-w-fit">
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
        {errors.departureDate && (
          <p className="text-red-500 text-sm w-24 lg:w-full">
            {errors.departureDate.message}
          </p>
        )}
      </div>

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
          {...(!oneWay &&
            register("returnDate", {
              validate: (value) =>
                new Date(value) >= new Date(getValues("departureDate")) ||
                "Return date must be equal to or after departure date",
            }))}
          className="pl-2 h-9 block w-full border-gray-300 rounded-md shadow-sm focus:outline-teal-700 focus:outline-1"
          disabled={oneWay}
        />

        {errors.returnDate && !oneWay && (
          <p className="text-red-500 text-sm w-24 lg:w-full">
            {errors.returnDate.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-teal-500 h-9 col-span-2 min-[530px]:col-span-1 text-white my-auto lg:my-0 text-center rounded-md shadow-sm hover:bg-teal-600 w-full w-min-32 px-4"
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
