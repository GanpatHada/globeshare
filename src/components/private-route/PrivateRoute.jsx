
import { Navigate} from 'react-router-dom';
import { auth } from '../../assets/Firebase';


export const PrivateRoute = ({children}) => {
   
  const isAuth=async()=>await auth.currentUser;

  return (isAuth()? children : <Navigate to="/login" />)
}