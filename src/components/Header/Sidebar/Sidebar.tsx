import sidebar__style from './sidebar.module.css';
import Profile from './Profile/Profile';
import Options from './Options/Options';
import { FC, useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { IoClose } from 'react-icons/io5';
const Sidebar: FC<{
  open:boolean
}> = ({ open }) => {
  const [isOpen, setIsOpen] = useState(open);
  useEffect(() => { setIsOpen(open) }, [open]);
  return (
    <div className={`${sidebar__style.menu_items} ${isOpen ? sidebar__style.open : ""}`}>
      <IconButton className={sidebar__style.close} >
        <IoClose onClick={() => {
          setIsOpen(false);
        }}/>
      </IconButton>
      <Profile />
      <Options />
    </div>
  )
}

export default Sidebar