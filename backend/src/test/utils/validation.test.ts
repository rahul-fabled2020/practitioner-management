import validate from "../../utils/validation";

describe("Schema Validation", () => {
  const schemaMock: { validate: jest.Mock<any, any, any> } = {
    validate: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should return resolved promise with value when there is no error", async () => {
    // Arrange
    const data = { name: "Rahul" };
    schemaMock.validate.mockReturnValueOnce({ error: null, value: data });

    // Act
    const result = await validate(data, schemaMock as any);

    // Assert
    expect(data).toEqual(result);
  });

  it("Should reject promise with error when there is error", async () => {
    // Arrange
    const data = { name: "Rahul" };
    const error = { message: "Invalid" };
    schemaMock.validate.mockReturnValueOnce({
      error,
      value: data,
    });

    // Act
    async function throwErrorOnValidate() {
      return validate(data, schemaMock as any);
    }

    // Assert
    await expect(throwErrorOnValidate).rejects.toEqual(error);
  });
});
