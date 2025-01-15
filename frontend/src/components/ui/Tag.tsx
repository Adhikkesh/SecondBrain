import crossIcon from "../icons/crossIcon";

interface TagType {
  tag?: string;
  size?: Size;
  cross?: boolean;
  onClick?: (id: number | undefined) => void;
  id?: number;
  value?: string;
}
type Size = "sm" | "md" | "lg";
const Sizes: Record<Size, string> = {
  sm: "px-2 py-1",
  md: "px-2 py-3",
  lg: "px-4 py-4",
};

export default function Tag(props: TagType) {
  const { tag, size = "sm", cross, onClick, id } = props;
  return (
    <div
      className={`text-purple-100 bg-purple-200 inline-block rounded-2xl ${Sizes[size]} flex justify-between items-center`}
    >
      # {tag}
      {cross && onClick && id !== undefined && (
        <button onClick={() => onClick(id)}>
          {crossIcon({ size: "sm", color: "text-gray-500" })}
        </button>
      )}
    </div>
  );
}
