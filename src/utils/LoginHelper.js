import isEmail from "validator/lib/isEmail";

export function areThereLoginErrors(email,password) {
  if (email.trim().length === 0) {
    return 'Please enter email';
  }
  if (password.trim().length === 0) {
    return 'Please enter password'
  }
  if (!isEmail(email.trim())) {
    return "Enter a valid Email"
  }
  return false;
}



export function getLoginError(code){
  if (code.includes("user-not-found"))
      return "account does not exists with this email";
    if (code.includes("auth/wrong-password"))
      return "Incorrect password";
    return "Something went wrong !";
}