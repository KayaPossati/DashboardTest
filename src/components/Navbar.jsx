import React, { useEffect } from 'react'

import { AiOutlineMenu } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import { RiNotification3Line } from 'react-icons/ri'
import { MdKeyboardArrowDown, MdChatBubbleOutline } from 'react-icons/md'

import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import avatar from '../data/avatar.jpg'
import { Cart, Chat, Notification, UserProfile } from '.'
import { useStateContext } from '../context/ContextProvider'

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position='BottomCenter'>
    <button type='button' onClick={customFunc} style={{ color }} className='navbar_btn'>
      <span style={{ background: dotColor}} className='btn_dot'/>
      {icon}
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const { activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick, screenSize, setScreenSize } = useStateContext()

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false)
    } else {
      setActiveMenu(true)
    }
  }, [screenSize])

  return (
    <div className='btns'>
      <NavButton title='Menu' 
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} 
        color='blue' 
        icon={<AiOutlineMenu />}
      />

      <div className='flex'>
        <NavButton title='Cart' 
        customFunc={() => handleClick('cart')} 
        color='blue' 
        icon={<FiShoppingCart />}
        />
        <NavButton title='Chat' 
        dotColor='#03c9d7'
        customFunc={() => handleClick('chat')} 
        color='blue' 
        icon={<MdChatBubbleOutline />}
        />
        <NavButton title='Notification' 
        dotColor='#03c9d7'
        customFunc={() => handleClick('notification')} 
        color='blue' 
        icon={<RiNotification3Line />}
        />

        <TooltipComponent content='Profile' position='BottomCenter'>
          <div className='profile items-center'
            onClick={() => handleClick('userProfile')}>
            <img 
              className='rounded-full w-8 h-8'
              src={avatar} alt="Profile Photo" />
            <p>
              <span className='profile_text'>Hi, </span> {' '}
              <span className='profile_text font-bold ml-1'>Michael</span>
            </p>
            <MdKeyboardArrowDown className='profile_text' />
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  )
}

export default Navbar