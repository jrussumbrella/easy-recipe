import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts";
import Button from "../Button";
import styles from "./MobileMenu.module.scss";

const MobileMenu = ({ isOpen }) => {
  const { user, logout } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  return (
    <div className={`${styles.mobileMenu} ${isOpen ? styles.isOpen : ""}`}>
      <nav>
        <ul>
          {user ? (
            <>
              <li>
                <Link to={`/user/${user.id}`} className={styles.link}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to={`/recipe/create`} className={styles.link}>
                  Create Recipe
                </Link>
              </li>
              <li>
                <span className={styles.link}>
                  <Button title="Log Out" onClick={handleLogout} />
                </span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className={styles.link}>
                  {" "}
                  Login to your Account{" "}
                </Link>
              </li>
              <li>
                <span className={styles.link}>
                  <Button title="Try for free" to="/register" />
                </span>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
