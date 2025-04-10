// Function for swapping className dependant on returned JSON (Used for hiding non-essential information)
function handlePercent(string) {
  if (string == "%") return "hidden-percent";
  return "shown-percent";
}

export default handlePercent;
