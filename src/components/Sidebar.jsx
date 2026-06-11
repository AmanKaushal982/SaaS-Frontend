import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdAnalytics, MdSettings, MdMenu } from 'react-icons/md';
import { FaTasks, FaUserShield } from 'react-icons/fa';
import { Menu } from 'lucide-react';

const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <MdDashboard /> },
    { to: '/tasks', label: 'Tasks', icon: <FaTasks /> },
    { to: '/analytics', label: 'Analytics', icon: <MdAnalytics /> },
    { to: '/settings', label: 'Settings', icon: <MdSettings /> },
    { to: '/admin', label: 'Admin', icon: <FaUserShield /> }
];

const Sidebar = () => {

    const NavLinkisActive = ({ isActive }) => {
        return `group flex items-center gap-3 px-3 rounded-xl py-2.5 text-sm font-medium transition
            ${isActive ? 'bg-primary text-sidebar font-semibold' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`;
    };
    const [open, setOpen] = useState(true);
    return (
        <aside className={`bg-sidebar flex flex-col p-3 shrink-0 transition-all duration-300 ease-in-out ${open ? 'w-50' : 'w-18'}`}>
            <div className="flex items-center px-2 mb-6 h-9 overflow-hidden">
                <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold bg-primary text-sidebar">
                    T
                </div>
                {open && <span className="text-lg font-semibold text-white whitespace-nowrap"> &nbsp;TaskFlow</span>}
            </div>
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center justify-center h-10 w-10 rounded-xl mb-4 text-white/70 hover:bg-white/10 transition"
                aria-label="Toggle sidebar"
            >
                <MdMenu className='text-xl' />
            </button>

            <nav className='flex flex-col gap-1'>
                {
                    navLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} className={NavLinkisActive}>
                            <span className='text-lg shrink-0'>{link.icon}</span>
                            <span className={`whitespace-nowrap transition-opacity duration-200 
                    ${open ? 'opacity-100 delay-100' : 'opacity-0'}`}>{link.label}</span>
                        </NavLink>
                    ))
                }
            </nav>
        </aside>
    )
}

export default Sidebar;