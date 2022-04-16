import sidebar__style from './sidebar.module.css';
import Profile from './Profile/Profile';
import Options from './Options/Options';
import { FC, useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { useAppSelector, useAppDispatch } from 'redux-hooks';
import { closeSidebar } from './searchbar-slice';

const Sidebar = () => {
  const isOpen = useAppSelector(({ sidebar }) => sidebar);
  const dispatch = useAppDispatch();
  return (
    <div className={`${sidebar__style.menu_items} ${isOpen ? sidebar__style.open : ""}`}>
      <IconButton className={sidebar__style.close} >
        <IoClose onClick={() => {
          dispatch(closeSidebar());
        }}/>
      </IconButton>
      <Profile />
      <Options />
    </div>
  )
}

export default Sidebar