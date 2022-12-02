import { useEffect, useState } from "react";

interface EventsConfig {
  isDisabled?: boolean;
  up?: () => void;
  down?: () => void;
}

export const useKeyPress = (keyCode: string, config: EventsConfig) => {
  const [isKeyPressed, setIsKeyPressed] = useState(false);
  const { isDisabled, up, down } = config;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === keyCode) {
        !isDisabled && down?.();
        setIsKeyPressed(true);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === keyCode) {
        !isDisabled && up?.();
        setIsKeyPressed(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [isDisabled, up, down, keyCode]);

  return isKeyPressed;
};
