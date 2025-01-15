interface TextArea{
    placeholder: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea(props: TextArea ){
    return (
        <div className="flex justify-between gap-4">
            <p className="text-sm font-semibold text-gray-900">{props.label}:</p>
            <textarea onChange={props.onChange} className="w-full p-4 rounded-lg border-2 border-gray-100 text-gray-900 focus:ring-blue-400 focus:border-blue-400"></textarea>
        </div>
    )
}