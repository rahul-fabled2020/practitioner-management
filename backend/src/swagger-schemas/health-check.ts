export const healthCheckSchema = {
  type: "object",
  properties: {
    app: {
      type: "string",
    },
    apiVersion: {
      type: "string",
    },
  },
};
