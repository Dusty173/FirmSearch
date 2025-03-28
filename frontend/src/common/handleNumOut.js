// Function for swapping className dependant on returned JSON (Used for hiding non-essential information)
function handleNumOut(num) {
  if (num > 0) return "shown-staff";
  return "hidden-staff";
}

export default handleNumOut;
