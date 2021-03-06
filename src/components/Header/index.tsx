import React, {memo, useEffect} from 'react';
import { Nav } from '../Nav';
import { SignInButton } from './SignInButton';
import styles from './styles.module.scss';
import {useWindowResize} from '../../hooks/useWindowResize';

const Header: React.FC = () => {
    const {width} = useWindowResize() || {width: 1000};

    return(
        <header className={styles.headerContainer} data-testid="TestHeaderElement">
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="logo ignews"/>
                {width > 921 && <Nav testId={"TestNavComponentHeader"}/>}
                <SignInButton />
            </div>
        </header>
    );  
}

export default memo(Header);