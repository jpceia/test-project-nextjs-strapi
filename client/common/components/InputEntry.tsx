interface InputEntryProps {
  type: "text" | "password" | "email",
  name: string,
  label: string,
  value: string,
  setValue: (value: string) => void
}

const InputEntry = ({type, name, label, value, setValue}: InputEntryProps) => {
  return (
    <div>
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
