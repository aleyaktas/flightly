import React, { useState } from "react";
import PropTypes from "prop-types";
import Dropdown from "rc-dropdown";
import { ReactComponent as DownIcon } from "../assets/icons/Down.svg";
import "rc-dropdown/assets/index.css";

const DropdownMenu = ({ onSortChange, className }) => {
  const [selected, setSelected] = useState("Filter");

  const options = [
    { name: "Departure Time", value: "departureTime" },
    { name: "Arrival Time", value: "arrivalTime" },
    { name: "Flight Duration", value: "duration" },
    { name: "Price", value: "price" },
  ];

  const handleMenuClick = (option) => {
    setSelected(option.name);
    onSortChange(option.value);
  };

  const menu = (
    <ul className="bg-white shadow rounded mt-2 py-1">
      {options.map((option) => (
        <li
          key={option.value}
          onClick={() => handleMenuClick(option)}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {option.name}
        </li>
      ))}
    </ul>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} className={className}>
      <button className="bg-transparent flex gap-2 items-center text-gray-800 font-semibold px-5">
        {selected}
        <DownIcon className="w-4 h-4" />
      </button>
    </Dropdown>
  );
};

DropdownMenu.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default DropdownMenu;
