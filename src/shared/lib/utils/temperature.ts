export const convertCelsius = (kelvin: number): string => {
  return (kelvin - 273.15).toFixed(1);
};
