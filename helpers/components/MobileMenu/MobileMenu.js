import React, { Fragment, useState } from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import Link from 'next/link';
import { IconButton } from '@mui/material';
import { Close, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const MobileMenu = ({ menuData }) => {
  const [openId, setOpenId] = useState(0);
  const [menuActive, setMenuState] = useState(false);

  const handleMenuToggle = () => {
    setMenuState(!menuActive);
    if (!menuActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const handleSubmenuToggle = (id) => {
    setOpenId(openId === id ? 0 : id);
  };

  const ClickHandler = () => {
    window.scrollTo(10, 0);
    setMenuState(false);
    document.body.style.overflow = 'auto';
  };

  // Static top-level items
  const staticMenus = [
    { id: 1, title: 'الرئيسية', link: '/' },
    { id: 2, title: 'من نحن', link: '/about' },
    { id: 3, title: 'اتصل بنا', link: '/contact' },
  ];

  // Dynamic fetched items
  const dynamicMenus = [
    { id: 4, title: 'الفروع', path: 'branches', items: menuData.branches },
    { id: 5, title: 'الاقسام', path: 'departments', items: menuData.departments },
    { id: 6, title: 'الخدمات', path: 'services', items: menuData.services },
    { id: 7, title: 'الاطباء', path: 'team', items: menuData.doctors },
    { id: 8, title: 'الاجهزة', path: 'team', items: menuData.devices },
    { id: 9, title: 'العروض', path: 'offers', items: menuData.offers },
    { id: 10, title: 'المقالات', path: 'blog', items: menuData.blogs },
  ];

  return (
    <div dir="rtl">
      <div className={`mobileMenu ${menuActive ? "show" : ""}`}>
        <div className="menu-close" style={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          backgroundColor: '#d9b755'
        }}>
          <IconButton 
            onClick={handleMenuToggle}
            size="large"
            sx={{ 
              color: '#fff',
              padding: '5px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)'
              }
            }}
          >
            <Close />
          </IconButton>
        </div>

        <ul className="responsivemenu">
          {staticMenus.map((item) => (
            <ListItem key={item.id} sx={{ padding: 0 }}>
              <Link 
                href={item.link} 
                onClick={ClickHandler}
                className="menu-link"
              >
                {item.title}
              </Link>
            </ListItem>
          ))}

          {dynamicMenus.map((menu) => (
            <Fragment key={menu.id}>
              <ListItem sx={{ padding: 0 }}>
                <div className="menu-item-container">
                  <Link 
                    href={`/${menu.path}`} 
                    onClick={ClickHandler}
                    className="menu-link"
                  >
                    {menu.title}
                  </Link>
                  {menu.items && menu.items.length > 0 && (
                    <IconButton 
                      onClick={() => handleSubmenuToggle(menu.id)}
                      size="small"
                      sx={{ 
                        color: '#fff',
                        padding: '8px',
                        marginLeft: '10px'
                      }}
                    >
                      {menu.id === openId ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  )}
                </div>
              </ListItem>
              
              {menu.items && menu.items.length > 0 && (
                <Collapse in={menu.id === openId} timeout="auto" unmountOnExit>
                  <ul className="subMenu">
                    {menu.items.map((sub) => (
                      <ListItem key={sub.id} sx={{ padding: 0 }}>
                        <Link 
                          href={`/${menu.path}/${sub.id}`} 
                          onClick={ClickHandler}
                          className="submenu-link"
                        >
                          {sub.name}
                        </Link>
                      </ListItem>
                    ))}
                  </ul>
                </Collapse>
              )}
            </Fragment>
          ))}
        </ul>
      </div>

      <div className="showmenu" onClick={handleMenuToggle} style={{
        backgroundColor: '#d9b755',
        borderRadius: '4px',
        padding: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <button type="button" className="navbar-toggler open-btn" style={{
          border: 'none',
          background: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '30px',
          height: '30px',
          padding: 0,
          cursor: 'pointer'
        }}>
          <span className="icon-bar first-angle" style={{
            display: 'block',
            width: '100%',
            height: '2px',
            backgroundColor: '#fff',
            margin: 'auto',
          }}></span>
          <span className="icon-bar middle-angle" style={{
            display: 'block',
            width: '100%',
            height: '2px',
            backgroundColor: '#fff',
            margin: 'auto',
          }}></span>
          <span className="icon-bar last-angle" style={{
            display: 'block',
            width: '100%',
            height: '2px',
            backgroundColor: '#fff',
                        margin: 'auto',

          }}></span>
        </button>
      </div>

      <style jsx>{`
        .menu-item-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .menu-link {
          display: block;
          padding: 13px 35px;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          text-decoration: none;
          flex-grow: 1;
        }
        .submenu-link {
          display: block;
          padding: 10px 35px 10px 50px;
          font-size: 13px;
          color: #fff;
          text-decoration: none;
          background-color: rgba(0, 0, 0, 0.1);
        }
        .subMenu {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        @media (max-width: 450px) {
          .menu-link {
            padding: 13px 25px;
          }
          .submenu-link {
            padding: 10px 25px 10px 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileMenu;