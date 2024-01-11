const SearchCard = () => {
  return (
    <div className="flex flex-col gap-4 w-64 mt-20">
      <p className="font-bold text-lg">Your Search</p>
      <div>
        <label for="from" className="block text-sm font-medium text-gray-700">
          From
        </label>
        <select
          id="from"
          name="from"
          className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:outline-teal-700 focus:outline-1"
        >
          <option value="">Select City</option>
          <option value="city1">City 1</option>
          <option value="city2">City 2</option>
        </select>
      </div>

      <div>
        <label for="to" class="block text-sm font-medium text-gray-700">
          To
        </label>
        <select
          id="to"
          name="to"
          className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:outline-teal-700 focus:outline-1"
        >
          <option value="">Select City</option>
          <option value="city1">City 1</option>
          <option value="city2">City 2</option>
        </select>
      </div>

      <div>
        <label
          for="departure"
          className="block text-sm font-medium text-gray-700"
        >
          Departure
        </label>
        <input
          type="date"
          id="departure"
          name="departure"
          className="mt-1 block w-full h-12 ouline-none border-gray-300 rounded-md shadow-sm focus:outline-teal-700 focus:outline-1"
        />
      </div>

      <div>
        <label for="return" class="block text-sm font-medium text-gray-700">
          Return
        </label>
        <input
          type="date"
          id="return"
          name="return"
          className="mt-1 block w-full h-12 outline-none border-gray-300 rounded-md shadow-sm focus:outline-teal-700 focus:outline-1"
        />
      </div>
      <button className="bg-teal-800 text-white h-12 text-center rounded-md shadow-sm hover:bg-teal-900">
        Search
      </button>
    </div>
  );
};

export default SearchCard;
