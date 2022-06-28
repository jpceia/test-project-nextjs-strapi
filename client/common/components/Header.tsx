import styles from "./Header.module.css"

/*
  Header component with the page title / brand
 */
const Header = () => {
  return (
    <h1 className={styles.title}>
      Test Project @ <span className={styles.brand}>Workmedia</span>
    </h1>
  );
}

export default Header;
