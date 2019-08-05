import { renderHook, act } from '@testing-library/react-hooks'
import { useLocalStorageItem } from "../src";

test('set/unset value', () => {
  const { result } = renderHook(() => useLocalStorageItem('stringItem'));
  expect(result.current[0]).toBeNull();
  act(() => {
    result.current[1]('value');
  });
  expect(result.current[0]).toBe('value');
  act(() => {
    result.current[2]();
  });
  expect(result.current[0]).toBeNull();
});

test('set/unset boolean value', () => {
  const { result } = renderHook(() => useLocalStorageItem('booleanItem'));
  expect(result.current[0]).toBeNull();
  act(() => {
    result.current[1](false);
  });
  expect(result.current[0]).toBe(false);
  act(() => {
    result.current[1](true);
  });
  expect(result.current[0]).toBe(true);
  act(() => {
    result.current[2]();
  });
  expect(result.current[0]).toBeNull();
});
