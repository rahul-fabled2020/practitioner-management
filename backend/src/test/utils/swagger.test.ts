import swaggerDocs from "../../utils/swagger";

describe("Swagger Spec", () => {
  const swaggerSpec: any = swaggerDocs;

  it("Should have the correct openapi property", () => {
    // Arrange
    const expected = "3.0.1";

    // Act
    const actual = swaggerSpec.openapi;

    // Assert
    expect(actual).toBe(expected);
  });

  it("Should have the correct title property", () => {
    // Arrange
    const expected = process.env.APP_NAME;

    // Act
    const actual = swaggerSpec.info.title;

    // Assert
    expect(actual).toBe(expected);
  });

  it("Should have the correct version property", () => {
    // Arrange
    const expected = process.env.APP_VERSION;

    // Act
    const actual = swaggerSpec.info.version;

    // Assert
    expect(actual).toBe(expected);
  });

  it("Should have the correct description property", () => {
    // Arrange
    const expected = process.env.APP_DESCRIPTION;

    // Act
    const actual = swaggerSpec.info.description;

    // Assert
    expect(actual).toBe(expected);
  });
});

describe("Swagger Schemas", () => {
  const swaggerSpec: any = swaggerDocs;

  it("Should have the HealthCheckSchema property", () => {
    // Assert
    expect(swaggerSpec.components.schemas.HealthCheckSchema).toBeTruthy();
  });

  it("Should have the PractitionerSchema property", () => {
    // Assert
    expect(swaggerSpec.components.schemas.PractitionerSchema).toBeTruthy();
  });
});
