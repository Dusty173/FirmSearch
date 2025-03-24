// Function for swapping className dependant on returned JSON (Used for hiding non-essential information)
function handleOutput(string) {
  if (string == "Y") return "shown";
  return "hidden";
}

export default handleOutput;
