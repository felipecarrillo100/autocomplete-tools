/// <reference types="react" />
declare const AutoComplete: <ObjectType>(options: {
    data: ObjectType[];
    onSelect: (e: ObjectType) => void;
    initialText?: string | undefined;
    keyString: string;
    placeholder?: string | undefined;
    customRender?: ((item: ObjectType) => JSX.Element) | undefined;
}) => JSX.Element;
export { AutoComplete };
