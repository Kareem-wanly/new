import { useEffect, useState } from "react";
import _debounce from "lodash/debounce";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounceHandler = _debounce(() => {
      setDebouncedValue(value);
    }, delay);

    debounceHandler();

    return () => {
      debounceHandler.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
