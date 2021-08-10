/// <reference types="react" />
interface AutoCompleteItemProps {
    onSelectItem: (e: any) => void;
    isHighlighted: boolean;
    content: JSX.Element;
}
declare const AutoCompleteItem: (options: AutoCompleteItemProps) => JSX.Element;
export { AutoCompleteItem };
