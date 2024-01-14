export const filterDropdownStyles = {
  control: (provided, state) => ({
    ...provided,

    borderColor: state.isFocused ? "#14B8A6" : "#d1d5db",
    boxShadow: "#14B8A6",
    "&:hover": {
      borderColor: "#14B8A6",
    },
    "&focus": {
      borderColor: "#14B8A6",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#E0F2F1" : null,
    color: state.isFocused ? "#065F46" : "#374151",
    "&:hover": {
      backgroundColor: "#A7F3D0",
      color: "#1F2937",
    },
  }),
};

export const selectCityStyles = {
  control: (provided, state) => ({
    ...provided,

    borderColor: state.isFocused ? "#14B8A6" : "#d1d5db",
    boxShadow: "#14B8A6",
    "&:hover": {
      borderColor: "#14B8A6",
    },
    "&focus": {
      borderColor: "#14B8A6",
    },
  }),
};
