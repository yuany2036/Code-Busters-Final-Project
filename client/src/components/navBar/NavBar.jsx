import { useState } from 'react';
import styles from './NavBar.module.scss';
import Menu from '~icons/mdi/menu';
import Close from '~icons/mdi/close';
import { NavLink } from 'react-router-dom';
import { NavBarButtons, NavBarData } from './NavBarData';
import LogoDesktop from '../../assets/1.svg';
import LogoMobile from '../../assets/2.svg';

const NavBar = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);

  const showDropDownMenu = () => {
    setDropDownMenu(!dropDownMenu);
  };

  const navBarData = NavBarData.map((item, index) => {
    return (
      <li key={index}>
        <NavLink
          to={item.path}
          className={styles.navbar_links}
          target={item.target}
          onClick={showDropDownMenu}
        >
          {item.title}
        </NavLink>
      </li>
    );
  });

  const navBarButtons = NavBarButtons.map((item, index) => {
    return (
      <NavLink
        key={index}
        to={item.path}
        className={styles.btn_links}
        onClick={showDropDownMenu}
      >
        <button>{item.title}</button>
      </NavLink>
    );
  });

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.navbar_left}>
          <NavLink to="/" className={styles.logo}>
            <img
              src={LogoDesktop}
              className={styles.logo_desktop}
              alt="website logo"
            />
            <img
              src={LogoMobile}
              className={styles.logo_mobile}
              alt="website logo"
            />
          </NavLink>
          <ul className={styles.links_left}>{navBarData}</ul>
        </div>
        <div className={styles.btns_container_navbar}>{navBarButtons}</div>
        <div className={styles.toggle_btn}>
          {!dropDownMenu && <Menu onClick={showDropDownMenu} />}
          {dropDownMenu && <Close onClick={showDropDownMenu} />}
        </div>
      </div>
      <div
        className={
          dropDownMenu
            ? `${styles.dropdown_menu} ${styles.open}`
            : `${styles.dropdown_menu}`
        }
      >
        {navBarData}
        <div className={styles.btns_container_dropdown}>{navBarButtons}</div>
      </div>
    </>
  );
};

export default NavBar;
