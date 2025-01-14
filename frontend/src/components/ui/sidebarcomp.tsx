import { ReactElement } from "react";

interface CompType{
    icon: ReactElement;
    text: string;
    color?: string;
}

export default function Comp(props: CompType){
    return (
        <div className="flex gap-3">
            {props.icon}
            <div className={`font-semibold text-lg ${props.color ? props.color : "bg-gray-900"}`}>{props.text}</div>
        </div>
    )
}