export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateName = (name: string): boolean => {
  const regex = /^[A-Za-zА-Яа-я]+$/;
  return regex.test(name);
};

export const validatePhone = (phone: string): boolean => {
  const regex = /^[0-9]{11}$/;
  return regex.test(phone);
};
