import { Fragment } from 'react';
import { Switch } from '@nextui-org/react';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';

import { useDarkMode } from '../hooks/useDarkMode';
import { SunIcon, MoonIcon } from '../icons/Icons';

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

const AdminNavbar = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <Disclosure as='nav'>
            <>
                <div className='h-14 mx-auto px-2 sm:px-6 lg:px-8 border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-primary-deepDark dark:text-primary-dark'>
                    <div className='relative flex h-full gap-4 items-center items-center justify-end'>
                        {/* <div className='flex  pr-2 sm:ml-6 sm:pr-0 gap-3'> */}
                        <button
                            type='button'
                            className={`relative rounded-full p-2 ${
                                darkMode
                                    ? 'bg-primary-dark text-primary-light'
                                    : 'bg-primary-light text-primary-dark'
                            } focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
                        >
                            <span className='absolute -inset-1.5' />
                            <span className='absolute w-2 h-2 bg-red-600 rounded-lg' />
                            <span className='sr-only'>View notifications</span>
                            <BellIcon className='h-5 w-5' aria-hidden='true' />
                        </button>

                        <Switch
                            defaultSelected
                            onClick={toggleDarkMode}
                            size='lg'
                            startContent={<SunIcon />}
                            endContent={<MoonIcon />}
                        />

                        <Menu as='div' className='relative'>
                            <Menu.Button className='relative flex items-center gap-2 font-medium rounded-full text-sm focus:outline-none'>
                                <div>
                                    <span className='absolute -inset-1.5' />
                                    <span className='sr-only'>
                                        Open user menu
                                    </span>
                                    <img
                                        className='h-8 w-8 rounded-full ring ring-primary ring-2 ring-offset-2'
                                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                        alt=''
                                    />
                                </div>
                                <p className='text-sm'>Nejmi Yassine</p>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='currentColor'
                                    className='w-4 h-4'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </Menu.Button>
                            <Transition
                                as={Fragment}
                                enter='transition ease-out duration-100'
                                enterFrom='transform opacity-0 scale-95'
                                enterTo='transform opacity-100 scale-100'
                                leave='transition ease-in duration-75'
                                leaveFrom='transform opacity-100 scale-100'
                                leaveTo='transform opacity-0 scale-95'
                            >
                                <Menu.Items className='absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href='#'
                                                className={classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700'
                                                )}
                                            >
                                                Your Profile
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href='#'
                                                className={classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700'
                                                )}
                                            >
                                                Settings
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href='#'
                                                className={classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700'
                                                )}
                                            >
                                                Sign out
                                            </a>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                    {/* </div> */}
                </div>
            </>
        </Disclosure>
    );
};

export default AdminNavbar;
