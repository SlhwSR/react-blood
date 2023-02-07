import { useRef } from "react";
export default function useLatestValue(fn) {
  const ref = useRef();
  ref.current = fn();
  return ref;
}
