import React from 'react'
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdAnalytics, MdSettings } from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';
import { FaUserShield } from 'react-icons/fa';

const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <MdDashboard /> },
    { to: '/tasks', label: 'Tasks', icon: <FaTasks /> },
    { to: '/analytics', label: 'Analytics', icon: <MdAnalytics /> },
    { to: '/settings', label: 'Settings', icon: <MdSettings /> },
    { to: '/admin', label: 'Admin', icon: <FaUserShield /> }
];

const Sidebar = () => {
    const NavLinkisActive = ({ isActive }) => {
        return (`flex items-center gap-3 transition-colors px-3 py-2
            ${isActive ? 'bg-white text-gray-900 font-semibold' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`)
    };
    return (
        <aside>
            <nav className='flex flex-col gap-1'>
                {
                    navLinks.map((link) => {
                        <NavLink key={link.to} to={link.to} className={NavLinkisActive}>
                            {link.icon}
                            {link.label}
                        </NavLink>
                    })
                }
            </nav>
        </aside>
    )
}

export default Sidebar;