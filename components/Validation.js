


export const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  

  export const isPasswordValid = (password) => {
    return password.length >= 6; 
  };
  
  // Проверка валидности имени
  export const isNameValid = (name) => {
    return name.trim() !== ''; 
  };
  