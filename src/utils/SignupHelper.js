import isEmail from "validator/lib/isEmail";

export const userObject = {
  profilePhoto: null,
  followers: [],
  following: [],
  bookmarks: [],
  bio: "i am using globeshare",
  website: "",
  isPrivate: false,
  fullName: ""
};

function createInitialUsrName(email) {
  return email.slice(0, email.indexOf("@"));
}

export function generateNGrams(text, n = 3) {
  text = text.toLowerCase();
  const result = [];
  for (let i = 0; i <= text.length - n; i++) {
    result.push(text.substring(i, i + n));
  }
  return result;
}

export function getUserDetails(email) {
  const userName = createInitialUsrName(email);
  const userNameLower = userName.toLowerCase();
  const userNameIndex = generateNGrams(userNameLower);

  const userDetails = {
    ...userObject,
    userName,
    userNameLower,
    userNameIndex
  };

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
