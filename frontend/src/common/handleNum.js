// Function for swapping className dependant on returned JSON (Used for hiding non-essential information)
function handleNum(num) {
  if (num > 0) return "shown";
  return "hidden";
}

export default handleNum;
