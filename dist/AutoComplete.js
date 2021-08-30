"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoComplete = void 0;
var react_1 = __importStar(require("react"));
var AutoCompleteItem_1 = require("./AutoCompleteItem");
var react_bootstrap_1 = require("react-bootstrap");
var AutoComplete = function (options) {
    var data = options.data, onSelect = options.onSelect, onClear = options.onClear, keyString = options.keyString, initialText = options.initialText, placeholder = options.placeholder, customRender = options.customRender;
    var _a = react_1.useState(false), isVisbile = _a[0], setVisiblity = _a[1];
    var _b = react_1.useState(initialText ? initialText : ""), search = _b[0], setSearch = _b[1];
    var _c = react_1.useState(-1), cursor = _c[0], setCursor = _c[1];
    var searchContainer = react_1.useRef(null);
    var searchResultRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var handleClickOutside = function (event) {
            if (searchContainer.current &&
                !searchContainer.current.contains(event.target)) {
                hideSuggestion();
            }
        };
        if (window)
            window.addEventListener("mousedown", handleClickOutside);
        return function () {
            if (window)
                window.removeEventListener("mousedown", handleClickOutside);
        };
    });
    var scrollIntoView = function (position) {
        if (searchResultRef !== null && searchResultRef.current !== null && searchResultRef.current.parentNode) {
            searchResultRef.current.parentNode.scrollTo({
                top: position,
                behavior: "smooth"
            });
        }
    };
    var suggestions = react_1.useMemo(function () {
        if (!search)
            return data;
        setCursor(-1);
        scrollIntoView(0);
        return data.filter(function (item) {
            return item[keyString].toLowerCase().includes(search.toLowerCase());
        });
    }, [data, keyString, search]);
    react_1.useEffect(function () {
        if (cursor < 0 || cursor > suggestions.length || !searchResultRef) {
            return function () {
            };
        }
        var ref = searchResultRef;
        var current = ref.current;
        if (typeof ref !== "undefined" && current && current.children) {
            var listItems = Array.from(current.children);
            listItems[cursor] && scrollIntoView(listItems[cursor].offsetTop);
        }
    }, [cursor, suggestions.length]);
    var showSuggestion = function () { return setVisiblity(true); };
    var hideSuggestion = function () { return setVisiblity(false); };
    var keyboardNavigation = function (e) {
        if (e.key === "ArrowDown") {
            isVisbile
                ? setCursor(function (c) { return (c < suggestions.length - 1 ? c + 1 : c); })
                : showSuggestion();
        }
        if (e.key === "ArrowUp") {
            setCursor(function (c) { return (c > 0 ? c - 1 : 0); });
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
    var height = undefined;
    var onInputChange = function (e) {
        setSearch(e.target.value);
        if (e.target.value.length === 0) {
            if (typeof onClear === "function")
                onClear();
        }
    };
    return (react_1.default.createElement("div", { className: "Autocomplete" },
        react_1.default.createElement("div", { ref: searchContainer },
            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "search", name: "search", autoComplete: "off", value: search, onClick: showSuggestion, onChange: onInputChange, onKeyDown: function (e) { return keyboardNavigation(e); }, placeholder: placeholder }),
            react_1.default.createElement("div", { style: { position: "relative" } },
                react_1.default.createElement("div", { className: "search-result " + (isVisbile ? "visible" : "invisible"), style: { top: height } },
                    react_1.default.createElement("ul", { className: "list-group", ref: searchResultRef }, suggestions.map(function (item, idx) {
                        var content = (typeof customRender === "function" ? customRender(item) : item[keyString]);
                        return (react_1.default.createElement(AutoCompleteItem_1.AutoCompleteItem, { key: idx, onSelectItem: function () {
                                hideSuggestion();
                                setSearch(item[keyString]);
                                onSelect(item);
                            }, isHighlighted: cursor === idx ? true : false, content: content }));
                    })))))));
};
exports.AutoComplete = AutoComplete;
