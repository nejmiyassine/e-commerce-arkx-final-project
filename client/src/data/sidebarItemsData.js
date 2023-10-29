import { LuLayoutDashboard } from 'react-icons/lu';
import { LuUsers2 } from 'react-icons/lu';
import { BiUser } from 'react-icons/bi';
import { MdOutlineInventory2 } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';
import { PiUserListLight } from 'react-icons/pi';
import { MdOutlineDiscount } from 'react-icons/md';
import { HiOutlineShoppingBag } from 'react-icons/hi';

export const sidebarItemsData = [
    {
        icon: LuLayoutDashboard,
        text: 'Dashboard',
        path: '/admin-dashboard',
    },
    {
        icon: MdOutlineDiscount,
        text: 'Products',
        path: '/admin-dashboard',
    },
    {
        icon: HiOutlineShoppingBag,
        text: 'Orders',
        path: '/admin-dashboard',
    },
    { icon: BiUser, text: 'Customers', path: '/admin-dashboard' },
    {
        icon: PiUserListLight,
        text: 'Users',
        path: '/users',
    },
    {
        icon: MdOutlineInventory2,
        text: 'Inventory',
        path: '/admin-dashboard',
    },
    {
        icon: BiTransfer,
        text: 'Transactions',
        path: '/admin-dashboard',
    },
    { icon: LuUsers2, text: 'Sellers', path: '/admin-dashboard' },
];
