
import { useContext, useEffect } from 'react';
import { Navigate} from 'react-router-dom';
import { UseAuth, UserContext } from '../../contexts/UserContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../assets/Firebase';
export const PrivateRoute = ({children}) => {
  const{user}=useContext(UserContext)
  return (user? children : <Navigate to="/login" />)
}