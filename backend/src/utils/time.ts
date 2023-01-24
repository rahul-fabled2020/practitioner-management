import { TIME_UNIT } from "../constants/constant";
import { EXCEPTION_MESSAGES } from "../constants/messages";

export function convertToMilliSeconds(
  time: number,
  unit: TIME_UNIT = TIME_UNIT.MINUTE
) {
  switch (unit) {
    case TIME_UNIT.SECOND:
      return time * 1000;
    case TIME_UNIT.MINUTE:
      return time * 60 * 1000;
    case TIME_UNIT.HOUR:
      return time * 60 * 60 * 1000;
    default:
      throw new Error(EXCEPTION_MESSAGES.UNSUPPORTED_TIME_UNIT);
  }
}
