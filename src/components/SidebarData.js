import React from 'react';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi';
import * as ImIcons from 'react-icons/im';
import * as RiIcons from 'react-icons/ri';



export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/',
        icon: <MdIcons.MdDashboard/>,
        cName: 'nav-text'
    },
    {
        title: 'Календарь заездов',
        path: '/arrival_schedule',
        icon: <BiIcons.BiCalendarCheck/>,
        cName: 'nav-text'
    },
    {
        title: 'Календарь бронирований',
        path: '/booking_schedule',
        icon: <BiIcons.BiCalendarPlus/>,
        cName: 'nav-text'
    },
    {
        title: 'Статистика',
        path: '/statistics',
        icon: <ImIcons.ImStatsDots/>,
        cName: 'nav-text'
    },
    {
        title: 'Объекты',
        path: '/accommodations',
        icon: <RiIcons.RiHomeHeartFill/>,
        cName: 'nav-text'
    },
    {
        title: 'Настройки объекта',
        path: '/settings',
        icon: <MdIcons.MdSettings/>,
        cName: 'nav-text'
    },
    {
        title: 'Выйти',
        path: '/logout',
        icon: <RiIcons.RiLogoutBoxLine/>,
        cName: 'nav-text'
    },
]