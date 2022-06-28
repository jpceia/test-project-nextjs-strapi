import styles from './InputEntry.module.css';

interface InputEntryProps {
  type: "text" | "password" | "email",
  name: string,
  label: string,
  value: string,
  setValue: (value: string) => void
}

/*
  Component to be used in forms, to get text values
  (or variations, like email or password)
 */
const InputEntry = ({type, name, label, value, setValue}: InputEntryProps) => {
  return (
    <div className={styles.entry}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default InputEntry;
