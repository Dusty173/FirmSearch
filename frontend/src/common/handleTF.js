// Function for swapping className dependant on true or false
function handleOutput(boolean) {
  if (boolean == true) return "shown-form";
  return "hidden-form";
}

export default handleOutput;
