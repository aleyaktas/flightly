export const getDurationInMinutes = (duration) => {
  const [hours, minutes] = duration.split("h").map((part) => parseInt(part));
  return hours * 60 + minutes;
};
