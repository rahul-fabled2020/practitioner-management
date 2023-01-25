import bcrypt from "bcryptjs";
import { compare, genHash, genSalt } from "../../utils/bcrypt";

jest.mock("bcryptjs");

describe("Generate Salt", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should resolve with salt when there is no error", async () => {
    // Arrange
    const spy = jest.spyOn(bcrypt, "genSalt");
    const salt = "salt";
    const error = null;
    const rounds = 10;

    spy.mockImplementationOnce((rounds, callback) => {
      callback(error as any, salt);
    });

    // Act
    const result = await genSalt(rounds);

    // Assert
    expect(result).toBe(salt);
    expect(spy).toBeCalledWith(rounds, expect.any(Function));
  });

  it("Should reject with error when there is error", async () => {
    // Arrange
    const spy = jest.spyOn(bcrypt, "genSalt");
    const salt = "salt";
    const error = new Error("Salting failed");
    const rounds = 10;

    spy.mockImplementationOnce((rounds, callback) => {
      callback(error as any, salt);
    });

    // Act
    const throwErrorOnGenSalt = () => genSalt(rounds);

    // Assert
    await expect(throwErrorOnGenSalt).rejects.toThrow(error);
    expect(spy).toBeCalledWith(rounds, expect.any(Function));
  });
});

describe("Generate Hash", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should resolve with hash when there is no error", async () => {
    // Arrange
    const spy = jest.spyOn(bcrypt, "hash");
    const salt = "salt";
    const password = "123";
    const hash = "hash";
    const error = null;

    spy.mockImplementationOnce((password, salt, callback: any) => {
      callback(error as any, hash);
    });

    // Act
    const result = await genHash(salt, password);

    // Assert
    expect(result).toBe(hash);
    expect(spy).toBeCalledWith(password, salt, expect.any(Function));
  });

  it("Should reject with error when there is error", async () => {
    // Arrange
    const spy = jest.spyOn(bcrypt, "hash");
    const salt = "salt";
    const password = "123";
    const hash = "hash";
    const error = new Error("Something went wrong");

    spy.mockImplementationOnce((password, salt, callback: any) => {
      callback(error as any, hash);
    });

    // Act
    const throwError = () => genHash(salt, password);

    // Assert
    await expect(throwError).rejects.toThrow(error);
    expect(spy).toBeCalledWith(password, salt, expect.any(Function));
  });
});

describe("Compare Password", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should resolve to true when there is match", async () => {
    // Arrange
    const password = "123";
    const hash = "abcd";
    const expected = true;
    jest
      .spyOn(bcrypt, "compare")
      .mockReturnValueOnce(Promise.resolve(expected) as any);

    // Act
    const result = await compare(password, hash);

    // Assert
    expect(result).toBe(expected);
  });

  it("Should throw error when there is no match", async () => {
    // Arrange
    const password = "123";
    const hash = "abcd";
    const expected = false;
    const spy = jest
      .spyOn(bcrypt, "compare")
      .mockReturnValueOnce(Promise.resolve(expected) as any);

    // Act
    function throwError() {
      return compare(password, hash);
    }

    // Assert
    await expect(throwError).rejects.toThrow();
    expect(spy).toBeCalledWith(password, hash);
  });
});
