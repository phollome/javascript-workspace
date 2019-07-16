"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

function useFileReader(inputRef) {
  var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      result = _useState2[0],
      setResult = _useState2[1];

  var fileReader = new FileReader();
  (0, _react.useEffect)(function () {
    var handler = function handler() {
      setResult(fileReader.result);
      fileReader.removeEventListener("load", handler);
    };

    fileReader.addEventListener("load", handler);
    return function () {
      fileReader.removeEventListener("load", handler);
    };
  });

  var changeHandler = function changeHandler() {
    if (inputRef.current) {
      var file = inputRef.current.files[0];

      if (file) {
        fileReader.readAsDataURL(file);
      }
    }
  };

  return [result, changeHandler];
}

var _default = useFileReader;
exports["default"] = _default;