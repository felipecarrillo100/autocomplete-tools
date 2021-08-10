/// <reference types="react" />
declare const AutoCompleteAjax: <ObjectType>(options: {
    query: (q: string) => {
        method?: string;
        data?: Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array> | string | null;
        referrerPolicy?: "" | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url";
        redirect?: "error" | "follow" | "manual";
        headers?: Headers | string[][] | Record<string, string>;
        credentials?: "include" | "omit" | "same-origin";
        cache?: "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload";
        mode?: "cors" | "navigate" | "no-cors" | "same-origin";
        queryString: string;
    };
    onSelect: (e: ObjectType) => void;
    initialText?: string | undefined;
    keyString: string;
    placeholder?: string | undefined;
    customRender?: ((item: ObjectType) => JSX.Element) | undefined;
}) => JSX.Element;
export { AutoCompleteAjax };
