import { useState, useRef } from 'react';
import styles from './NavBar.module.scss';
import Menu from '~icons/mdi/menu';
import Close from '~icons/mdi/close';
// import Magnify from '~icons/mdi/magnify';
// import MenuMagnify from '~icons/mdi/text-search-variant';
import { NavLink } from 'react-router-dom';
import { NavBarData } from './LoggedInNavBarData';
import LogoDesktop from '../../assets/1.svg';
import LogoMobile from '../../assets/2.svg';
import NavBarModal from './navBarModal/NavBarModal';
import ProfileCircle from './ProfileCircle';
import SearchBar from './searchBar/SearchBar';
import MenuSearchBar from './searchBar/MenuSearchBar';
import NavBarModalContent from './navBarModal/navBarModalContent/NavBarModalContent';

const LoggedInNavBar = () => {
  const searchRef = useRef(null);
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  // const [searchBar, setSearchBar] = useState(false);
  //controling the dropdown menu state
  const showDropDownMenu = () => {
    setDropDownMenu(!dropDownMenu);
  };

  const keyCloseModal = (e) => {
    if (e.key === 'Escape') closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.removeProperty('overflow');
    document.removeEventListener('keydown', keyCloseModal);
    setSearchValue('');
  };

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', keyCloseModal);
  };

  //show searchbar in dropdown menu
  // const showSearchBar = () => {
  //   setSearchBar(!searchBar);
  // };

  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Show modal when the user starts typing
    if (value.length > 0) {
      openModal();
    } else {
      closeModal();
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
      searchRef.current.focus();
    }
  };

  // displaying the objects from LoggedInNavBarData
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
          <SearchBar
            searchValue={searchValue}
            searchHandler={searchHandler}
            searchRef={searchRef}
          />
          {showModal && (
            <NavBarModal
              closeModal={closeModal}
              // setSearchValue={setSearchValue}
              searchValue={searchValue}
              searchHandler={searchHandler}
            >
              <NavBarModalContent />
            </NavBarModal>
          )}
        </div>
        <div className={styles.loggedin_navbar_right}>
          {navBarData}
          <ProfileCircle />
        </div>
        <div className={styles.toggle_btn}>
          {!dropDownMenu && (
            <Menu className={styles.menuBarsIcon} onClick={showDropDownMenu} />
          )}
          {dropDownMenu && (
            <div className={styles.open_menu}>
              <Close className={styles.closeIcon} onClick={showDropDownMenu} />
            </div>
          )}
        </div>
      </div>
      <div
        className={
          dropDownMenu
            ? `${styles.dropdown_menu} ${styles.open}`
            : `${styles.dropdown_menu}`
        }
      >
        <MenuSearchBar
          searchValue={searchValue}
          searchHandler={searchHandler}
        />
        <div className={styles.profileCircle}>
          <ProfileCircle />
        </div>

        {navBarData}
      </div>
    </>
  );
};

export default LoggedInNavBar;
