import HttpStatus from "http-status-codes";
import buildError from "../../utils/errorBuilder";

describe("Error Builder", () => {
  it("Should return a BAD_REQUEST error for validation errors", () => {
    // Arrange
    const validationError = {
      isJoi: true,
      details: [
        {
          message: '"username" is required',
          path: ["username"],
        },
        {
          message: '"password" must be at least 8 characters long',
          path: ["password"],
        },
      ],
    };
    const errorDetails = [
      {
        message: '"username" is required',
        param: "username",
      },
      {
        message: '"password" must be at least 8 characters long',
        param: "password",
      },
    ];

    // Act
    const error = buildError(validationError);

    // Assert
    expect(error.code).toBe(HttpStatus.BAD_REQUEST);
    expect(error.message).toBe(
      HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)
    );
    expect(error.details).toEqual(errorDetails);
  });

  it("Should return an error for boom errors", () => {
    // Arrange
    const boomError = {
      isBoom: true,
      output: {
        statusCode: HttpStatus.UNAUTHORIZED,
        payload: {
          message: "Invalid credentials",
        },
      },
    };

    // Act
    const error = buildError(boomError);

    // Assert
    expect(error.code).toBe(HttpStatus.UNAUTHORIZED);
    expect(error.message).toBe("Invalid credentials");
  });

  it("Should return an INTERNAL_SERVER_ERROR for all other cases", () => {
    // Arrange
    const errorCode = HttpStatus.INTERNAL_SERVER_ERROR;

    // Act
    const error = buildError({});

    // Assert
    expect(error.code).toBe(errorCode);
    expect(error.message).toBe(HttpStatus.getStatusText(errorCode));
  });
});
