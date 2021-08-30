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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoCompleteAjax = void 0;
var react_1 = __importStar(require("react"));
var AutoCompleteItem_1 = require("./AutoCompleteItem");
var react_bootstrap_1 = require("react-bootstrap");
var AutoCompleteAjax = function (options) {
    var query = options.query, onSelect = options.onSelect, onClear = options.onClear, keyString = options.keyString, initialText = options.initialText, placeholder = options.placeholder, customRender = options.customRender;
    var _a = react_1.useState([]), suggestions = _a[0], setSuggestions = _a[1];
    var _b = react_1.useState(initialText ? initialText : ""), search = _b[0], setSearch = _b[1];
    var _c = react_1.useState(false), isVisbile = _c[0], setVisiblity = _c[1];
    var _d = react_1.useState(-1), cursor = _d[0], setCursor = _d[1];
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
    react_1.useEffect(function () {
        var q = query(search);
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, json, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(q.queryString, {
                            method: q.method ? q.method : 'GET',
                            mode: q.mode ? q.mode : 'cors',
                            cache: q.cache ? q.cache : 'no-cache',
                            credentials: q.credentials ? q.credentials : 'same-origin',
                            headers: q.headers ? q.headers : {},
                            redirect: q.redirect ? q.redirect : 'follow',
                            referrerPolicy: q.referrerPolicy ? q.referrerPolicy : 'no-referrer',
                            body: q.data ? JSON.stringify(q.data) : undefined // body data type must match "Content-Type" header
                        })];
                    case 1:
                        response = _a.sent();
                        if (!(response.status === 200)) return [3 /*break*/, 5];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, response.json()];
                    case 3:
                        json = _a.sent();
                        setSuggestions(json);
                        setCursor(-1);
                        return [2 /*return*/, json];
                    case 4:
                        e_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, []];
                }
            });
        }); };
        fetchData();
    }, [query, search]);
    var scrollIntoView = function (position) {
        if (searchResultRef !== null && searchResultRef.current !== null && searchResultRef.current.parentNode) {
            searchResultRef.current.parentNode.scrollTo({
                top: position,
                behavior: "smooth"
            });
        }
    };
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
    }, [cursor, suggestions]);
    var showSuggestion = function () {
        setVisiblity(true);
    };
    var hideSuggestion = function () {
        setVisiblity(false);
        setCursor(-1);
        scrollIntoView(0);
    };
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
exports.AutoCompleteAjax = AutoCompleteAjax;
