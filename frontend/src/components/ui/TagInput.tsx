import { Button } from "./Button";
import InputBox from "./inputBox";

interface TagInputType {
  handleTag: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
}

export default function TagInput({
  handleTag,
  handleSubmit,
  value,
}: TagInputType) {
  console.log(value);
  return (
    <div className="flex justify-between gap-4">
      <InputBox
        placeholder="Enter a tag"
        label="Tags"
        onChange={handleTag}
        value={value}
      />
      <Button
        variant="primary"
        content="Add"
        size="sm"
        onClick={handleSubmit}
      />
    </div>
  );
}
