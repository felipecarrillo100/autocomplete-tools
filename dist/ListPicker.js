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
exports.ListPicker = void 0;
var react_1 = __importStar(require("react"));
var AutoCompleteItem_1 = require("./AutoCompleteItem");
var react_bootstrap_1 = require("react-bootstrap");
var ListPicker = function (options) {
    var data = options.data, onSelect = options.onSelect, keyString = options.keyString, id = options.id, idString = options.idString, placeholder = options.placeholder, customRender = options.customRender;
    var _a = react_1.useState(false), isVisbile = _a[0], setVisiblity = _a[1];
    var index = data.findIndex(function (i) { return i[idString] === id; });
    // @ts-ignore
    var _b = react_1.useState(index > -1 ? data[index][keyString] : ""), search = _b[0], setSearch = _b[1];
    var _c = react_1.useState(index), cursor = _c[0], setCursor = _c[1];
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
        return data;
    }, [data]);
    react_1.useEffect(function () {
        if (cursor < 0 || cursor > suggestions.length || !searchResultRef) {
            return function () {
            };
        }
        var ref = searchResultRef;
        var current = ref.current;
        if (typeof ref !== "undefined" && current && current.children) {
            var listItems = Array.from(current.children);
            if (listItems[cursor]) {
                scrollIntoView(listItems[cursor].offsetTop);
            }
            else {
                scrollIntoView(0);
            }
        }
    }, [cursor, suggestions.length]);
    var showSuggestion = function () {
        setVisiblity(true);
    };
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
    return (react_1.default.createElement("div", { className: "Autocomplete" },
        react_1.default.createElement("div", { ref: searchContainer },
            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", name: "search", autoComplete: "off", value: search, onChange: function () { }, onClick: showSuggestion, onKeyDown: function (e) { return keyboardNavigation(e); }, placeholder: placeholder }),
            react_1.default.createElement("div", { style: { position: "relative" } },
                react_1.default.createElement("div", { className: "search-result " + (isVisbile ? "visible" : "invisible"), style: { top: height } },
                    react_1.default.createElement("ul", { className: "list-group", ref: searchResultRef }, suggestions.map(function (item, idx) {
                        var content = (typeof customRender === "function" ? customRender(item) : item[keyString]);
                        return (react_1.default.createElement(AutoCompleteItem_1.AutoCompleteItem, { key: idx, onSelectItem: function () {
                                hideSuggestion();
                                setSearch(item[keyString]);
                                onSelect(item);
                                setCursor(idx);
                            }, isHighlighted: cursor === idx ? true : false, content: content }));
                    })))))));
};
exports.ListPicker = ListPicker;
