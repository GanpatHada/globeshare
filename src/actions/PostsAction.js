export const savePosts=(dispatch,postsToBeSaved)=>dispatch({type:'SET_POSTS',payload:postsToBeSaved})
export const startLoading=(dispatch)=>dispatch({type:'START_LOADING'});
export const stopLoading=(dispatch)=>dispatch({type:'STOP_LOADING'});