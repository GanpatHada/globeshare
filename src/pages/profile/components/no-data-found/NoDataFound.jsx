import emptyBox from "../../../../images/empty-box.png";
import './NoDataFound.css'
const NoDataFound = ({type='data'}) => {
  
  return (
    <div className="no-data-found all-centered">
      <img src={emptyBox} alt="" />
      <p>{`No ${type} found`}</p>
    </div>
  );
};

export default NoDataFound;
