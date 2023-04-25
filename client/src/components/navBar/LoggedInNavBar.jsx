import { useState } from 'react';
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
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  // const [searchBar, setSearchBar] = useState(false);
  //controling the dropdown menu state
  const showDropDownMenu = () => {
    setDropDownMenu(!dropDownMenu);
  };

  const keyCloseModal = (e) => {
    if (e.key === 'Escape') {
      document.removeEventListener('keydown', keyCloseModal);
      setSearchValue('');
      setShowModal(false);
    }
  };
  //show searchbar in dropdown menu
  // const showSearchBar = () => {
  //   setSearchBar(!searchBar);
  // };

  if (showModal) document.addEventListener('keydown', keyCloseModal);

  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Show modal when the user starts typing
    if (value.length > 0) {
      setShowModal(true);
      document.removeEventListener('keydown', keyCloseModal);
    } else {
      setShowModal(false);
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
          <div className={styles.logo}>
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
          </div>
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            searchHandler={searchHandler}
          />
          {showModal && (
            <NavBarModal
              onClose={setShowModal}
              setSearchValue={setSearchValue}
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
