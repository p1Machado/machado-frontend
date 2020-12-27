import { useContext } from "react";
import { MobileMediaQueryContext } from "app/layouts";

export function useMobileMediaQuery() {
  return useContext(MobileMediaQueryContext);
}
