
export const isWordAndTranslationValid = (word, translation) => {
  if (word.trim() === "" || translation.trim() === "") {
    return false;
  }

  if (word.length > 30 || translation.length > 30) {
    return false;
  }

  return true;
};
