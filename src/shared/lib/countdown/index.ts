import { useEffect, useState } from "react";

export const useCountdown = (count: number = 5, min: number = 2) => {
  const [ isEnd, setIsEnd] = useState(true);
  const [ time, setTime ] = useState(count);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isEnd) return;

      if (time < min) {
        setIsEnd(true);
        clearTimeout(timeout);
        return;
      }

      setTime(time - 1);
    }, 1000);

    return function() {
      clearTimeout(timeout);
    }
  }, [time, isEnd]);

  const start = () => {
    setTime(count);
    setIsEnd(false);
  }

  const reset = () => {
    setIsEnd(true);
  }

  return { start, time, isEnd, reset }
}
