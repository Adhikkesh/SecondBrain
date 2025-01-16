import { ReactElement } from "react";

interface CompType {
  icon: ReactElement;
  text: string;
  color?: string;
  onClick?: (e: string) => void;
}

export default function Comp(props: CompType) {
  return (
    <div className="flex gap-3">
      {props.icon}
      <div
        className={`font-semibold text-lg ${
          props.color ? props.color : "bg-gray-900"
        }`}
      >
        <button
          onClick={() => {props.onClick && props.onClick(props.text)}}
        >
          {props.text}
        </button>
      </div>
    </div>
  );
}
