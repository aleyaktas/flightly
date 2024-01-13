import React, { useState } from "react";
import { mockFlights as allAirports } from "../api/mockApi";

const SearchCard = ({ onSearch }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({
      from,
      to,
      departureDate,
      returnDate,
    });
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col gap-4 w-64 mt-20">
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
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:outline-teal-700 focus:outline-1"
        >
          <option value="">Select City</option>
          {allAirports.map((airport, index) => (
            <option key={index} value={airport.code}>
              {airport.city} ({airport.code})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="to" className="block text-sm font-medium text-gray-700">
          To
        </label>
        <select
          id="to"
          name="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:outline-teal-700 focus:outline-1"
        >
          <option value="">Select City</option>
          {allAirports.map((airport, index) => (
            <option key={index} value={airport.code}>
              {airport.city} ({airport.code})
            </option>
          ))}
        </select>
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
          name="departure"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:outline-teal-700 focus:outline-1"
        />
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
          name="return"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:outline-teal-700 focus:outline-1"
        />
      </div>

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
