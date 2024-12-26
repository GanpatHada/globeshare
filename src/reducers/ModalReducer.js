export const initialModalState={
    isOpen:false,
    type:null
}

export function modalReducer(state,action){
    switch(action.type)
    {
        case 'OPEN_MODAL':return {...state,type:action.payload,isOpen:true}
        case 'CLOSE_MODAL':return {...state,type:null,isOpen:false}
        default :return{...state}
    }
}