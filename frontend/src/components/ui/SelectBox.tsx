interface SelectBoxType{
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

const SelectBox:React.FC<SelectBoxType> = ({onChange,value}) => {
  return (
    <div className="flex gap-4 justify-between items-center">
      <p className="block mb-2 text-sm font-bold text-gray-900">Type:</p>
      <select onChange={onChange} value={value} className="w-full bg-gray-50  border-2 border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3">
        <option selected>Select a Type</option>
        <option value="document">Document</option>
        <option value="video">Video</option>
        <option value="audio">Audio</option>
        <option value="tweet">Tweet</option>
      </select>
    </div>
  );
}

export default SelectBox;
