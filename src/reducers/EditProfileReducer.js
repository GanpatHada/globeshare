export function initialEditProfileState(user) {
  let editableFields={
    profilePhoto:user.profilePhoto,
    userName:user.userName,
    fullName:user.fullName,
    bio:user.bio,
    website:user.website,
    isPrivate:user.isPrivate
  } 
  return {
    updatedProfile: editableFields,
    loading: false,
    userNameFetching: false,
    userNameInfo:{
        type:'SUCCESS',
        infoText:''
    }
  };
}
export function editProfileReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        updatedProfile: {
          ...state.updatedProfile,
          [action.payload.field]: action.payload.value,
        },
      };

    case "START_LOADING":
      return { ...state, loading: true };

    case "STOP_LOADING":
      return { ...state, loading: false };

    case "START_USERNAME_FETCHING":
      return { ...state, userNameFetching: true };

    case "STOP_USERNAME_FETCHING":
      return { ...state, userNameFetching: false };

    case "SET_USERNAME_INFO":
        return { ...state, userNameInfo:{...state.userNameInfo,type:action.payload.type,infoText:action.payload.infoText} };    
  }
}
