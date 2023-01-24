import { TIME_UNIT } from "../../constants/constant";
import { EXCEPTION_MESSAGES } from "../../constants/messages";

import { convertToMilliSeconds } from "../../utils/time";

describe("Convert to Milliseconds", () => {
  it("Should return time in milliseconds when time in second is provided", () => {
    // Arrange
    const time = 12;
    const unit = TIME_UNIT.SECOND;
    const expected = 12000;

    // Act
    const result = convertToMilliSeconds(time, unit);

    // Assert
    expect(result).toBe(expected);
  });

  it("Should return time in milliseconds when time in minute is provided", () => {
    // Arrange
    const time = 12;
    const unit = TIME_UNIT.MINUTE;
    const expected = 720000;

    // Act
    const result = convertToMilliSeconds(time, unit);

    // Assert
    expect(result).toBe(expected);
  });

  it("Should return time in milliseconds when time in hour is provided", () => {
    // Arrange
    const time = 12;
    const unit = TIME_UNIT.HOUR;
    const expected = 43200000;

    // Act
    const result = convertToMilliSeconds(time, unit);

    // Assert
    expect(result).toBe(expected);
  });

  it("Should throw error when time unit is not in second, minute or hour", () => {
    // Arrange
    const time = 12;
    const unit = "Random Time Unit";
    const errorMessage = EXCEPTION_MESSAGES.UNSUPPORTED_TIME_UNIT;

    // Act
    function convertToMilliSecondsWrapper() {
      convertToMilliSeconds(time, unit as TIME_UNIT);
    }

    // Assert
    expect(convertToMilliSecondsWrapper).toThrowError(errorMessage);
  });

  it("Should return NaN when time is not a number", () => {
    // Arrange
    const time = undefined as unknown as number;
    const unit = TIME_UNIT.SECOND;
    const expected = NaN;

    // Act
    const result = convertToMilliSeconds(time, unit);

    // Assert
    expect(expected).toBe(result);
  });
});
