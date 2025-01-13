interface TagType {
  tag?: string;
  size?: Size;
}
type Size = "sm" | "md" | "lg";
const Sizes: Record<Size, string> = {
  sm: "px-2 py-1",
  md: "px-2 py-3",
  lg: "px-4 py-4",
};

export default function Tag(props: TagType) {
    const {tag,size="sm"} = props;
  return (
    <div className={`text-purple-100 bg-purple-200 inline-block rounded-2xl ${Sizes[size]}`}>
      # {tag}
    </div>
  );
}
