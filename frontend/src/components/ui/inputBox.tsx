interface InputBoxType {
  placeholder: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
const InputBox: React.FC<InputBoxType> = ({label,placeholder,onChange,value}: InputBoxType) => {
  return (
    <div className="flex gap-4 items-center">
      <p className="text-sm font-semibold">{label}:</p>
      <input
        placeholder={placeholder}
        className="w-full py-2 px-2 rounded-lg border-2 border-gray-100 focus:ring-blue-500 focus:border-blue-500"
        onChange={onChange}
        value={value}
      ></input>
    </div>
  );
}

export default InputBox;