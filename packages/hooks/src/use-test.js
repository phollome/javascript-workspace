function test() {
  console.log("test");
}

export default function useTest() {
  return { testFunc: test };
}
