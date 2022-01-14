import * as React from 'react';
import { FiBell, FiSettings } from 'react-icons/fi';
import Navbar from '../Navbar';
import styles from './header.module.css';

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <img />
            </div>

            <div className={styles.navigation}>
                <Navbar />
            </div>

            <div className={styles.notificationSettings}>
                <FiBell size={35} color="#414344" />
                <FiSettings size={35} color="#414344" />
            </div>
        </div>
    );
}

export default Header;