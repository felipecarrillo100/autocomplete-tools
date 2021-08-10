import React, {useState, useRef, useEffect} from "react";
import { AutoCompleteItem } from "./AutoCompleteItem";
import {Form} from "react-bootstrap";

const AutoCompleteAjax = <ObjectType, >(options: {
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
    }
    onSelect: (e: ObjectType) => void;
    initialText?: string;
    keyString: string;
    placeholder?: string;
    customRender?: (item: ObjectType) => JSX.Element;
}) => {
    const {query, onSelect, keyString, initialText, placeholder, customRender} = options;

    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [search, setSearch] = useState(initialText ? initialText : "");

    const [isVisbile, setVisiblity] = useState(false);
    const [cursor, setCursor] = useState(-1);

    const searchContainer = useRef<HTMLDivElement>(null);
    const searchResultRef = useRef<HTMLUListElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (
                searchContainer.current &&
                !searchContainer.current.contains(event.target)
            ) {
                hideSuggestion();
            }
        };
        if (window) window.addEventListener("mousedown", handleClickOutside);

        return () => {
            if (window) window.removeEventListener("mousedown", handleClickOutside);
        };
    });

    useEffect(() => {
        const q = query(search);
        const fetchData = async () => {
            const response = await fetch(q.queryString, {
                method: q.method ? q.method :'GET', // *GET, POST, PUT, DELETE, etc.
                mode: q.mode ? q.mode :'cors', // no-cors, *cors, same-origin
                cache: q.cache ? q.cache : 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: q.credentials ? q.credentials :'same-origin', // include, *same-origin, omit
                headers: q.headers ? q.headers : {},
                redirect: q.redirect ? q.redirect : 'follow', // manual, *follow, error
                referrerPolicy: q.referrerPolicy ? q.referrerPolicy : 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: q.data ? JSON.stringify(q.data) : undefined // body data type must match "Content-Type" header
            });
            if (response.status === 200) {
                try {
                    const json = await response.json();
                    setSuggestions(json);
                    setCursor(-1);
                    return json;
                } catch (e) {}
            }
            return [];
        };
        fetchData();
    }, [query, search]);

    const scrollIntoView = (position: number) => {
        if (searchResultRef !== null && searchResultRef.current !== null && searchResultRef.current.parentNode) {
            (searchResultRef.current.parentNode as any).scrollTo({
                top: position,
                behavior: "smooth"
            });
        }
    };

    useEffect(() => {
        if (cursor < 0 || cursor > suggestions.length || !searchResultRef) {
            return () => {
            };
        }
        const ref = searchResultRef;
        const current = ref.current;
        if (typeof ref !== "undefined" && current && current.children) {
            let listItems = Array.from(current.children) as any;
            if (listItems[cursor]) {
                scrollIntoView(listItems[cursor].offsetTop);
            } else {
                scrollIntoView(0);
            }
        }
    }, [cursor, suggestions]);


    const showSuggestion = () => {
        setVisiblity(true);
    }

    const hideSuggestion = () => {
        setVisiblity(false);
        setCursor(-1);
        scrollIntoView(0)
    }

    const keyboardNavigation = (e: any) => {
        if (e.key === "ArrowDown") {
            isVisbile
                ? setCursor(c => (c < suggestions.length - 1 ? c + 1 : c))
                : showSuggestion();
        }

        if (e.key === "ArrowUp") {
            setCursor(c => (c > 0 ? c - 1 : 0));
        }

        if (e.key === "Escape") {
            hideSuggestion();
        }

        if (e.key === "Enter" && cursor > 0) {
            setSearch(suggestions[cursor][keyString]);
            hideSuggestion();
            onSelect(suggestions[cursor]);
        }
    };

    const height = undefined;

    return (
        <div className="Autocomplete">
            <div ref={searchContainer}>
                <Form.Control
                    type="search"
                    name="search"
                    autoComplete="off"
                    value={search}
                    onClick={showSuggestion}
                    onChange={(e: any) => setSearch(e.target.value)}
                    onKeyDown={(e: any) => keyboardNavigation(e)}
                    placeholder={placeholder}
                />
                <div style={{position: "relative"}}>
                    <div className={`search-result ${isVisbile ? "visible" : "invisible"}`} style={{top: height}}>
                        <ul className="list-group" ref={searchResultRef}>
                            {suggestions.map((item: any, idx: number) => {
                                const content = ( typeof customRender === "function" ? customRender(item) : item[keyString])
                                return (
                                    <AutoCompleteItem
                                        key={idx}
                                        onSelectItem={() => {
                                            hideSuggestion();
                                            setSearch(item[keyString]);
                                            onSelect(item);
                                        }}
                                        isHighlighted={cursor === idx ? true : false}
                                        content={content}
                                    />
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
};

export {
    AutoCompleteAjax
}
