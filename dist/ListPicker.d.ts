/// <reference types="react" />
declare const ListPicker: <ObjectType>(options: {
    data: ObjectType[];
    onSelect: (e: ObjectType) => void;
    id?: string | number | undefined;
    keyString: string;
    idString: string;
    placeholder?: string | undefined;
    customRender?: ((item: ObjectType) => JSX.Element) | undefined;
}) => JSX.Element;
export { ListPicker };
