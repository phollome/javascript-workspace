import { renderHook, act } from "@testing-library/react-hooks";
import { useFetchJSON } from "../src";
import { exportAllDeclaration } from "@babel/types";

const message = "A JSON response! 🙀";

const fetchResult = {
  json: () => Promise.resolve({ message }),
}

test('fetch json data', (done) => {
  global.fetch = jest.fn().mockReturnValue(Promise.resolve(fetchResult));
  const { result } = renderHook(() => useFetchJSON());
  act(() => {
    result.current[2]();
  })
  expect(result.current[1]).toBe(true);

  setTimeout(() => {
    expect(result.current[1]).toBe(false);
    expect(result.current[0].message).toBe(message);
    done();
  }, 100);
});
