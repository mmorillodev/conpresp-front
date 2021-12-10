import * as React from 'react';
import styles from './Footer.module.scss';

import logo from '../../assets/logo-white.svg';
import facebook from '../../assets/facebook.svg';
import instagram from '../../assets/instagram.svg';
import youtube from '../../assets/youtube.svg';

function Footer() {
    return(
        <footer className={styles.footer}>
            <img className={styles.logo} src={logo} alt="logo" />
            <ul className={styles.socials} >
                <li><a href="/"><img src={facebook} alt="logo" /></a></li>
                <li><a href="/"><img src={instagram} alt="logo" /></a></li>
                <li><a href="/"><img src={youtube} alt="logo" /></a></li>
            </ul>

            <div className={styles.footerBox}>
                <h3>Copyright 2021. Anhembi Morumbi.</h3>
            </div>
        </footer>
    );
}

export default Footer