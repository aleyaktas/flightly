import Select from "react-select";
import PropTypes from "prop-types";
import { filterOptions } from "../helpers/filterDropDown";
import { filterDropdownStyles } from "../helpers/customStyles";

const FilterDropdown = ({ onSort }) => {
  return (
    <div className="mt-4 mb-2">
      <Select
        options={filterOptions}
        className="ml-auto w-44"
        onChange={onSort}
        styles={filterDropdownStyles}
        placeholder="Filter"
      />
    </div>
  );
};

export default FilterDropdown;

FilterDropdown.propTypes = {
  onSort: PropTypes.func,
};
