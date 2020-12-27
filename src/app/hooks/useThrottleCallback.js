import { useCallback } from "react";
import { throttle } from "lodash";

export function useThrottleCallback(callback, wait, options) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(throttle(callback, wait, options), [callback, wait, options]);
}
