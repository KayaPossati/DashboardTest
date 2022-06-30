import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SiShopware } from 'react-icons/si'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { links } from '../data/dummy'
import { useStateContext } from '../context/ContextProvider'

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext()

  const handleCloseSidebar = () => {
    if(activeMenu && screenSize > 900) {
      setActiveMenu(false)
    }
  }

  const activeLink = 'active_link text-md'
  const normalLink = 'normal_link text-md'

  return (
    <div className='sidebar_wrapper'>
      {activeMenu && (<>
        <div className='logo_wrapper'>
          <Link to='/' onClick={handleCloseSidebar} className='logo'>
            <SiShopware /> <span>Shoppy</span>
          </Link>
        </div>

        <div className='mt-10'>
          {links.map((item) => (
            <div key={item.title}>
              <p className='sidebar_title'>
                {item.title}
              </p>
              {item.links.map((link) => (
                <NavLink to={`/${link.name}`}
                  key={link.name}
                  onClick={handleCloseSidebar}
                  className={({ isActive}) => 
                    isActive ? activeLink : normalLink
                  }> 
                  {link.icon}
                  <span className='capitalize'>{link.name}</span>

                </NavLink>
              ))}
            </div>
          ))}
        </div>
      </>)}
    </div>
  )
}

export default Sidebar