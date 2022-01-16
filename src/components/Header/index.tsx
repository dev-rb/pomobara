import * as React from 'react';
import { FiBell, FiSettings } from 'react-icons/fi';
import Navbar from '../Navbar';
import styles from './header.module.css';

const Header = () => {
    return (
        <div className='sticky top-0 flex w-full h-fit justify-between items-center z-[1] bg-[#151718] py-2 px-0 lg:bg-[#1D2021] lg:py-0 lg:px-8 lg:col-span-1'>
            <div className='w-10 h-10 rounded-full border-2 border-solid border-[#2881D9]'>
                <img />
            </div>

            <div className='w-2/5 lg:block'>
                <Navbar />
            </div>

            <div className='flex flex-row gap-8'>
                <FiBell size={35} color="#414344" style={{ strokeWidth: 1.5 }} />
                <FiSettings size={35} color="#414344" style={{ strokeWidth: 1.5 }} />
            </div>
        </div>
    );
}

export default Header;