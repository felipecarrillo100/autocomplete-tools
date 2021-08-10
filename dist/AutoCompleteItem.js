"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoCompleteItem = void 0;
var react_1 = __importDefault(require("react"));
var AutoCompleteItem = function (options) {
    var onSelectItem = options.onSelectItem, isHighlighted = options.isHighlighted, content = options.content;
    return (react_1.default.createElement("li", { className: "list-group-item " + (isHighlighted ? "active highlighted" : ""), onClick: onSelectItem },
        react_1.default.createElement("div", { className: "row" },
            react_1.default.createElement("div", { className: "col text-left" }, content))));
};
exports.AutoCompleteItem = AutoCompleteItem;
