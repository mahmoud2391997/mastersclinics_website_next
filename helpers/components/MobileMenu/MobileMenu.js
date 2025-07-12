import React, { Fragment, useState } from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import Link from 'next/link';
const menus = [
    {
        id: 1,
        title: 'الرئيسية',
        link: '/home',
        submenu: [
            {
                id: 11,
                title: 'الرئيسية النمط 1',
                link: '/home'
            },
            {
                id: 12,
                title: 'الرئيسية النمط 2',
                link: '/home-2'
            },
            {
                id: 13,
                title: 'الرئيسية النمط 3',
                link: '/home-3'
            },
        ]
    },
    {
        id: 2,
        title: 'من نحن',
        link: '/about',
    },
    {
        id: 3,
        title: 'الصفحات',
        link: '/',
        submenu: [
            {
                id: 31,
                title: 'الأطباء',
                link: '/team'
            },
            {
                id: 32,
                title: 'صفحة الطبيب',
                link: '/team-single/Marlene-Henry'
            },
            {
                id: 33,
                title: 'المتجر',
                link: '/shop'
            },
            {
                id: 34,
                title: 'صفحة المنتج',
                link: '/shop-single/prayer-mat'
            },
            {
                id: 35,
                title: 'عربة التسوق',
                link: '/cart'
            },
            {
                id: 36,
                title: 'الدفع',
                link: '/checkout'
            },
            {
                id: 37,
                title: 'خطأ 404',
                link: '/404'
            },
            {
                id: 38,
                title: 'الأسئلة الشائعة',
                link: '/faq'
            },
        ]
    },
    {
        id: 4,
        title: 'الخدمات',
        link: '#',
        submenu: [
            {
                id: 41,
                title: 'الخدمات',
                link: '/services',
            },
            {
                id: 42,
                title: 'خدمة مفردة',
                link: '/service-single/Dental-Care',
            },
        ]
    },
    {
        id: 5,
        title: 'الأجهزة',
        link: '/',
        submenu: [
            {
                id: 51,
                title: 'الأجهزة',
                link: '/project',
            },
            {
                id: 52,
                title: 'صفحة الجهاز',
                link: '/project-single/Heart-Institure'
            },
        ]
    },
    {
        id: 6,
        title: 'المدونة',
        link: '/blog',
        submenu: [
            {
                id: 61,
                title: 'المدونة',
                link: '/blog'
            },
            {
                id: 62,
                title: 'المدونة مع الشريط الجانبي الأيسر',
                link: '/blog-left-sidebar'
            },
            {
                id: 63,
                title: 'المدونة بعرض كامل',
                link: '/blog-fullwidth'
            },
            {
                id: 64,
                title: 'مقال مفرد',
                link: '/blog-single/Why-Industry-Are-A-Juicy-Target-For'
            },
            {
                id: 65,
                title: 'مقال مفرد مع الشريط الجانبي الأيسر',
                link: '/blog-single-left-sidebar/Why-Industry-Are-A-Juicy-Target-For'
            },
            {
                id: 66,
                title: 'مقال مفرد بعرض كامل',
                link: '/blog-single-fullwidth/Why-Industry-Are-A-Juicy-Target-For'
            },
        ]
    },
    {
        id: 7,
        title: 'اتصل بنا',
        link: '/contact',
    }
];

const MobileMenu = () => {
    const [openId, setOpenId] = useState(0);
    const [menuActive, setMenuState] = useState(false);

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    };

    return (
        <div dir="rtl">
            <div className={`mobileMenu ${menuActive ? "show" : ""}`}>
                <div className="menu-close">
                    <div className="clox" onClick={() => setMenuState(!menuActive)}><i className="ti-close"></i></div>
                </div>

                <ul className="responsivemenu">
                    {menus.map((item, mn) => {
                        return (
                            <ListItem className={item.id === openId ? 'active' : null} key={mn}>
                                {item.submenu ? (
                                    <Fragment>
                                        <p onClick={() => setOpenId(item.id === openId ? 0 : item.id)}>
                                            {item.title}
                                            <i className={item.id === openId ? 'fa fa-angle-up' : 'fa fa-angle-down'} style={{ marginRight: 8 }}></i>
                                        </p>
                                        <Collapse in={item.id === openId} timeout="auto" unmountOnExit>
                                            <List className="subMenu">
                                                {item.submenu.map((submenu, i) => (
                                                    <ListItem key={i}>
                                                        <Link onClick={ClickHandler} className="active" href={submenu.link}>
                                                            {submenu.title}
                                                        </Link>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Collapse>
                                    </Fragment>
                                ) : (
                                    <Link className="active" onClick={ClickHandler} href={item.link}>
                                        {item.title}
                                    </Link>
                                )}
                            </ListItem>
                        );
                    })}
                </ul>
            </div>

            <div className="showmenu mobail-menu" onClick={() => setMenuState(!menuActive)}>
                <button type="button" className="navbar-toggler open-btn">
                    <span className="icon-bar first-angle"></span>
                    <span className="icon-bar middle-angle"></span>
                    <span className="icon-bar last-angle"></span>
                </button>
            </div>
        </div>
    );
};

export default MobileMenu;
