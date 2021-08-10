import React from "react";

interface AutoCompleteItemProps {
    onSelectItem: (e: any) => void;
    isHighlighted: boolean;
    content: JSX.Element;
}

const AutoCompleteItem = (options: AutoCompleteItemProps) => {
    const { onSelectItem, isHighlighted, content} = options;
    return (
        <li
            className={`list-group-item ${ isHighlighted ? "active highlighted" : "" }`} onClick={onSelectItem} >
            <div className="row">
                <div className="col text-left">
                    {content}
                </div>
            </div>
        </li>
    );
};

export {
    AutoCompleteItem
};
