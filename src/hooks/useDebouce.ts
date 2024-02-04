// useDebounce.ts
import { useState, useEffect, useCallback } from "react";

// custom hook to return a debounced value
const useDebounce = (value: any, delay: number) => {
  // state to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  // function to update the debounced value
  const updateDebouncedValue = useCallback(() => {
    setDebouncedValue(value);
  }, [value]);

  // effect to call the update function after a delay
  useEffect(() => {
    // create a timer
    const timer = setTimeout(updateDebouncedValue, delay);
    // clear the timer on cleanup
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, updateDebouncedValue]);

  // return the debounced value
  return debouncedValue;
};

export default useDebounce;
