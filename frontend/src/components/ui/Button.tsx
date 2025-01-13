type VariantTypes = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  variant: VariantTypes;
  content: string;
  icon?: any;
  size?: Size;
  onClick?: () => void;
}

const Sizes: Record<Size, string> = {
  sm: "px-5 py-3",
  md: "p-6 py-4",
  lg: "p-7 py-5",
};

const Variants: Record<VariantTypes, string> = {
  primary: "bg-purple-100 text-white",
  secondary: "bg-purple-200 text-purple-300",
};

const defaultDesign = "rounded-lg flex items-center";
export const Button = (props: ButtonProps) => {
  const { variant, content, size = "md" } = props;
  return (
    <button
      className={`${Variants[variant]} ${defaultDesign} ${Sizes[size] || " "}`}
    >
      {props.icon ? <div className="mr-4">{props.icon}</div> : null} {content}
    </button>
  );
};
