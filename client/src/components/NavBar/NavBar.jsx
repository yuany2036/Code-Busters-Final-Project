import React from "react";
import classes from "./NavBar.module.scss";
import Menu from "~icons/mdi/menu";

const NavBar = () => {
  return (
    <div>
      <div className={classes.navbar}>
        <div className={classes.logo}>
          <a href="#">LOGO</a>
        </div>
        <ul className={classes.links}>
          <li>
            <a href="#">Explore</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>

        <a href="#" className={classes.action_btn}>
          Login
        </a>
        <div className={classes.toggle_btn}>
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
