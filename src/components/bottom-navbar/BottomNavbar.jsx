import React from 'react'
import './BottomNavbar.css'
import { AiFillHome, AiOutlineSearch, AiOutlineHeart ,AiOutlineMenu} from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { BsPlusSquare } from "react-icons/bs";
const BottomNavbar = () => {
  return (
    <nav id="bottom-nav">
        <ul>
          <li><AiFillHome/></li>
          <li><AiOutlineSearch/></li>
          <li><BsPlusSquare/></li>
          <li><AiOutlineHeart/></li>
          <li><AiOutlineMenu/></li>
        </ul>
    </nav>
  )
}

export default BottomNavbar