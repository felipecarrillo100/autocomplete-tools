import React, {useState, useRef, useEffect, useMemo} from "react";
import { AutoCompleteItem } from "./AutoCompleteItem";
import {Form} from "react-bootstrap";

const AutoComplete = <ObjectType, >(options: {
    data: ObjectType[],
    onSelect: (e: ObjectType) => void;
    onClear?: () => void;
    initialText?: string;
    keyString: string;
    placeholder?: string;
    customRender?: (item: ObjectType) => JSX.Element;
}) => {
    const {data, onSelect, onClear, keyString, initialText, placeholder, customRender} = options;

    const [isVisbile, setVisiblity] = useState(false);
    const [search, setSearch] = useState(initialText ? initialText : "");
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

    const scrollIntoView = (position: number) => {
        if (searchResultRef !== null && searchResultRef.current !== null && searchResultRef.current.parentNode) {
            (searchResultRef.current.parentNode as any).scrollTo({
                top: position,
                behavior: "smooth"
            });
        }
    };

    const suggestions = useMemo(() => {
        if (!search) return data;

        setCursor(-1);
        scrollIntoView(0);

        return data.filter((item: any) =>
            item[keyString].toLowerCase().includes(search.toLowerCase())
        );
    }, [data, keyString, search]) as any;

    useEffect(() => {
        if (cursor < 0 || cursor > suggestions.length || !searchResultRef) {
            return () => {
            };
        }
        const ref = searchResultRef;
        const current = ref.current;
        if (typeof ref !== "undefined" && current && current.children) {
            let listItems = Array.from(current.children) as any;
            listItems[cursor] && scrollIntoView(listItems[cursor].offsetTop);
        }
    }, [cursor, suggestions.length]);


    const showSuggestion = () => setVisiblity(true);

    const hideSuggestion = () => setVisiblity(false);

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

    const onInputChange = (e: any) => {
        setSearch(e.target.value);
        if (e.target.value.length === 0) {
            if (typeof onClear === "function") onClear();
        }
    }

    return (
        <div className="Autocomplete">
            <div ref={searchContainer}>
                <Form.Control
                    type="search"
                    name="search"
                    autoComplete="off"
                    value={search}
                    onClick={showSuggestion}
                    onChange={onInputChange}
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

export  {
    AutoComplete
};
