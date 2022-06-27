import styles from "./Header.module.css"

const Header = () => {
  return (
    <h1 className={styles.title}>
      Test Project @ <span className={styles.brand}>Workmedia</span>
    </h1>
  );
}

export default Header;
