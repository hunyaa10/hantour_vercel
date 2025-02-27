// 이메일 유효성검사
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const isValidEmail = (email) => {
  return emailRegex.test(email);
};

// 비밀번호 유효성검사
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;
export const isValidPassword = (password) => {
  return passwordRegex.test(password);
};

// 전화번호 유효성검사
const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
export const isValidPhone = (phone) => {
  return phoneRegex.test(phone);
};
