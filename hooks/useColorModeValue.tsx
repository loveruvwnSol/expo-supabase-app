import { useState, useEffect } from "react";
import { useColorMode } from "native-base";

export const useSwitchValue = () => {
  const [switchValue, setSwitchValue] = useState<boolean>();
  const { colorMode } = useColorMode();
  useEffect(() => {
    if (colorMode === "light") {
      setSwitchValue(false);
    } else if (colorMode === "dark") {
      setSwitchValue(true);
    }
  }, [colorMode]);

  return switchValue;
};
