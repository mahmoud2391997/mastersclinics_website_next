"use client";
import React, { Fragment, useState } from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import Link from 'next/link';
import { IconButton } from '@mui/material';
import { Close, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const MobileMenu = ({ menuData }) => {
  const [openIds, setOpenIds] = useState([]);
  const [menuActive, setMenuState] = useState(false);

  const handleMenuToggle = () => {
    setMenuState(!menuActive);
    if (!menuActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const toggleSubmenu = (id) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const ClickHandler = () => {
    window.scrollTo(10, 0);
    setMenuState(false);
    document.body.style.overflow = 'auto';
  };

  const normalizeDepartmentName = (name, type) => {
    const prefixMap = {
      doctors: "أطباء",
      services: "خدمات",
      offers: "عروض",
    };
    const prefix = prefixMap[type];
    if (!prefix) return name;
    const cleanedName = name.replace(/^قسم\s+/, "").trim();
    return `${prefix} ${cleanedName}`;
  };

  // Group departments like in desktop
  const mainDepartments = [
    "قسم الجلدية",
    "قسم الاسنان",
    "قسم النساء والولادة",
    "قسم التغذية"
  ];

  const groupedDepartments = {
    main: (menuData.departments || []).filter(dept => mainDepartments.includes(dept.name)),
    general: (menuData.departments || []).filter(dept => !mainDepartments.includes(dept.name))
  };

  // Group branches by region like in desktop
  const groupedBranches = (menuData.branches || []).reduce((acc, branch) => {
    if (!acc[branch.region_name]) {
      acc[branch.region_name] = [];
    }
    acc[branch.region_name].push(branch);
    return acc;
  }, {});

  // Static top-level items
  const staticMenus = [
    { id: 1, title: 'الرئيسية', link: '/' },
    { id: 2, title: 'من نحن', link: '/about' },
    { id: 3, title: 'اتصل بنا', link: '/contact' },
  ];

  // Dynamic fetched items with proper structure
  const dynamicMenus = [
    { 
      id: 4, 
      title: 'الفروع', 
      path: 'branches',
      items: Object.entries(groupedBranches).map(([region, branches]) => ({
        id: `branch-region-${region}`,
        title: region,
        items: branches.map(branch => ({
          id: branch.id,
          title: branch.name,
          link: `/branches/${branch.id}`
        }))
      }))
    },
    { 
      id: 5, 
      title: 'الاقسام', 
      path: 'departments',
      items: [
        ...groupedDepartments.main.map(dept => ({
          id: dept.id,
          title: dept.name,
          link: `/departments/${dept.id}`
        })),
        {
          id: 'general-departments',
          title: 'الأقسام العامة',
          items: groupedDepartments.general.map(dept => ({
            id: dept.id,
            title: dept.name,
            link: `/departments/${dept.id}`
          }))
        }
      ]
    },
    { 
      id: 6, 
      title: 'الخدمات', 
      path: 'services', 
      items: (menuData.services || []).map(service => ({
        id: service.department_id,
        title: normalizeDepartmentName(service.department_name, 'services'),
        link: `/services?departmentId=${service.department_id}`
      }))
    },
    { 
      id: 7, 
      title: 'الاطباء', 
      path: 'doctors', 
            link: '/doctors'

    
    },
    { 
      id: 8, 
      title: 'العروض', 
      path: 'offers', 
      items: (menuData.offers || []).map(offer => ({
        id: offer.department_id,
        title: normalizeDepartmentName(offer.department_name, 'offers'),
        link: `/offers?departmentId=${offer.department_id}`
      }))
    },
    {
      id: 9,
      title: 'المقالات',
      path: 'blogs',
      link: '/blogs'
    }
  ];

  const renderMenuItems = (items, level = 0) => {
    return items.map((item) => (
      <Fragment key={item.id}>
        <ListItem sx={{ 
          padding: 0, 
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          backgroundColor: level > 0 ? 'rgba(0,0,0,0.1)' : 'transparent'
        }}>
          <div className="flex justify-around items-center w-full" style={{ paddingLeft: `${level * 15}px` }}>
            {item.link ? (
              <Link 
                href={item.link} 
                onClick={ClickHandler}
                className="menu-link"
              >
                {item.title}
              </Link>
            ) : (
              <div 
                className="menu-link"
                style={{ cursor: 'pointer' }}
                onClick={() => toggleSubmenu(item.id)}
              >
                {item.title}
              </div>
            )}
            
            {item.items && item.items.length > 0 && (
              <IconButton 
                onClick={() => toggleSubmenu(item.id)}
                size="small"
                sx={{ 
                  color: '#fff',
                  padding: '8px',
                  marginLeft: '10px'
                }}
              >
                {openIds.includes(item.id) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            )}
          </div>
        </ListItem>
        
        {item.items && item.items.length > 0 && (
          <Collapse in={openIds.includes(item.id)} timeout="auto" unmountOnExit>
            <ul className="subMenu">
              {renderMenuItems(item.items, level + 1)}
            </ul>
          </Collapse>
        )}
      </Fragment>
    ));
  };

  return (
    <div dir="rtl">
      <div className={`mobileMenu !bg-[#d9b755] ${menuActive ? "show" : ""}`}>
        <div className="menu-close" style={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          backgroundColor: '#d9b755',
          borderBottom: '1px solid rgba(255,255,255,0.2)'
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
            <ListItem key={item.id} sx={{ 
              padding: 0,
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
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
              <ListItem sx={{ 
                padding: 0,
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div className="menu-item-container">
                  <Link 
                    href={menu.link ? menu.link : `/${menu.path}`} 
                    onClick={ClickHandler}
                    className="menu-link"
                  >
                    {menu.title}
                  </Link>
                  {menu.items && menu.items.length > 0 && (
                    <IconButton 
                      onClick={() => toggleSubmenu(menu.id)}
                      size="small"
                      sx={{ 
                        color: '#fff',
                        padding: '8px',
                        marginLeft: '10px'
                      }}
                    >
                      {openIds.includes(menu.id) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  )}
                </div>
              </ListItem>
              
              {menu.items && menu.items.length > 0 && (
                <Collapse in={openIds.includes(menu.id)} timeout="auto" unmountOnExit>
                  <ul className="subMenu">
                    {renderMenuItems(menu.items, 1)}
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
            margin: '2px 0',
          }}></span>
          <span className="icon-bar middle-angle" style={{
            display: 'block',
            width: '100%',
            height: '2px',
            backgroundColor: '#fff',
            margin: '2px 0',
          }}></span>
          <span className="icon-bar last-angle" style={{
            display: 'block',
            width: '100%',
            height: '2px',
            backgroundColor: '#fff',
            margin: '2px 0',
          }}></span>
        </button>
      </div>

      <style jsx>{`
        .mobileMenu {
          position: fixed;
          right: -280px;
          top: 0;
          width: 280px;
          height: 100%;
          background: #2a2a2a;
          z-index: 9999;
          transition: all 0.5s ease;
          overflow-y: auto;
        }
        .mobileMenu.show {
          right: 0;
        }
        .menu-item-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .menu-link {
          display: block;
          padding: 15px 20px;
          font-size: 15px;
          font-weight: 500;
          color: #fff;
          text-decoration: none;
          flex-grow: 1;
        }
        .subMenu {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        @media (max-width: 450px) {
          .mobileMenu {
            width: 100%;
            right: -104%;
          }
          .menu-link {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileMenu;