type VariantTypes = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  variant: VariantTypes;
  content: string;
  icon?: any;
  size?: Size;
  onClick?:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement>) => void);
}

const Sizes: Record<Size, string> = {
  sm: "px-5 py-3",
  md: "px-6 py-4",
  lg: "px-7 py-5",
};

const Variants: Record<VariantTypes, string> = {
  primary: "bg-purple-100 text-white",
  secondary: "bg-purple-200 text-purple-300",
};

const defaultDesign = "rounded-lg flex items-center justify-center size-max";
export const Button = (props: ButtonProps) => {
  const { variant, content, size = "md" } = props;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(event);
    }
  };
  return (
    <div className="flex justify-center">
      <button
        className={`${Variants[variant]} ${defaultDesign} ${
          Sizes[size] || " "
        }`}
        onClick={handleClick}
      >
        {props.icon ? <div className="mr-4">{props.icon}</div> : null} {content}
      </button>
    </div>
  );
};
