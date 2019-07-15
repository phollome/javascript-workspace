"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useTest;

function test() {
  console.log("test");
}

function useTest() {
  return {
    testFunc: test
  };
}