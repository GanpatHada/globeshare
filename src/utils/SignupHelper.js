import isEmail from "validator/lib/isEmail";

export const userObject = {
  userName: null,
  profilePhoto: null,
  followers: [],
  following: [],
  bookmarks: [],
  likes: [],
  bio: "i am using globeshare",
  website: null,
};

function createInitialUsrName(email) {
  return email.slice(0, email.indexOf("@"));
}

export function getUserDetails(email) {
  const userDetails = { ...userObject, userName: createInitialUsrName(email) };
  return userDetails;
}

export function areThereSignupErrors(email, password, confirmPassword) {
  if (email.trim().length === 0) {
    return "Please enter email";
  }
  if (password.trim().length === 0) {
    return "Please enter password";
  }
  if (confirmPassword.trim().length === 0) {
    return "Please confirm password";
  }
  if (!isEmail(email.trim())) {
    return "Enter a valid Email";
  }
  if (password.trim().length < 6) {
    return "Password should be atleast six characters";
  }
  if (confirmPassword !== password)
    return "The passwords you entered do not match";
  return false;
}

export function getSignupError(code) {
  if (code.includes("auth/email-already-in-use"))
    return "There is already an account with this email";
  else return "Something went wrong !";
}
