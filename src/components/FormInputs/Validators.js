export function validateTextInputIsNotEmpty(setValid, value) {
  if (value === null || value === "") {
    setValid(false);
  } else {
    setValid(true);
  }
}
