import React from 'react'
import './BottomNavbar.css'
import { AiFillHome, AiOutlineSearch, AiOutlineHeart ,AiOutlineMenu} from "react-icons/ai";
import { BsPlusSquare } from "react-icons/bs";
import { NavLink} from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
const BottomNavbar = () => {
  const{user:{userId}}=useUser()
  return (
    <nav id="bottom-nav">
        <ul>
          <NavLink to={"/"}><AiFillHome/></NavLink>
          <NavLink to={"/explore"}><AiOutlineSearch/></NavLink>
          <NavLink><BsPlusSquare/></NavLink>
          <NavLink><AiOutlineHeart/></NavLink>
          <NavLink to={`/profile/${userId}`}><AiOutlineMenu/></NavLink>
        </ul>
    </nav>
  )
}

export default BottomNavbar