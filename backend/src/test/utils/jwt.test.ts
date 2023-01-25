import jwt from "jsonwebtoken";
import { signJwt, verifyJwt } from "../../utils/jwt";
import { jwtConfig } from "../../config/config";

jest.mock("jsonwebtoken");

describe("Sign JWT Token", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should resolve to token when there is no error", async () => {
    // Arrange
    const payload: any = {};
    const key: any = "key";
    const options: any = { algorithm: jwtConfig.signingAlgorithm };
    const token: any = "token";
    const spy = jest.spyOn(jwt, "sign").mockReturnValueOnce(token);
    global.Buffer.from = jest.fn(() => key) as any;

    // Act
    const result = await signJwt(payload, key, options);

    // Assert
    expect(result).toBe(token);
    expect(spy).toBeCalledWith(payload, key, options);
  });
});

describe("Verify JWT Token", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should resolve to token when there is no error", async () => {
    // Arrange
    const key: any = "key";
    const token: any = "token";
    const decoded: any = "decoded";
    const spy = jest.spyOn(jwt, "verify").mockReturnValueOnce(decoded);
    global.Buffer.from = jest.fn(() => key) as any;

    // Act
    const result = await verifyJwt(token, key);

    // Assert
    expect(result).toBe(decoded);
    expect(spy).toBeCalledWith(token, key);
  });

  it("Should return null when there is error", async () => {
    // Arrange
    const key: any = "key";
    const token: any = "token";
    const spy = jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
      throw new Error("error");
    });
    global.Buffer.from = jest.fn(() => key) as any;

    // Act
    const result = await verifyJwt(token, key);

    // Assert
    expect(result).toBeNull();
    expect(spy).toBeCalledWith(token, key);
  });
});
