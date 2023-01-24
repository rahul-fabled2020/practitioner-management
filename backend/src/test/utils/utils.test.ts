import { TIME_UNIT } from "../../constants/constant";

import * as timeUtils from "../../utils/time";
import { getTokenCookieOptions } from "../../utils/utils";

const mock = jest.mock("../../utils/time");

describe("Get Token Cookie Options", () => {
  beforeEach(() => {
    global.Date.now = jest.fn(() => new Date("2023-01-01").valueOf());
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("Should return the correct cookie options", () => {
    // Arrange
    const expiry = 30;
    const expiryUnit = TIME_UNIT.MINUTE;
    const expectedOptions = {
      expires: new Date("2023-01-01T00:30:00.000Z"),
      maxAge: 1800000,
      httpOnly: true,
      sameSite: "lax",
    };
    const spy = mock.spyOn(timeUtils, "convertToMilliSeconds");
    spy.mockReturnValueOnce(1800000);

    // Act
    const result = getTokenCookieOptions(expiry, expiryUnit);

    // Assert
    expect(result).toEqual(expectedOptions);
    expect(timeUtils.convertToMilliSeconds).toHaveBeenCalledWith(
      expiry,
      expiryUnit
    );
  });
});
