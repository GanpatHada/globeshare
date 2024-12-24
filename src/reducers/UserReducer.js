export const initialUser={
    user:null,
    loading:true
};

export function userReducer(state,action){
    switch (action.type) {
        case "SET_USER":
          return {
            ...state,
            user: {...state.user,...action.payload},
          };
        case "START_LOADING":{
          return {
              ...state,loading:true
          }  
        };
        case "STOP_LOADING":{
          return {
              ...state,loading:false
          }  
        } 
        default:
          throw new Error(`Unhandled action type: ${action.type}`);
      }
}