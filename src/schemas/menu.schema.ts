export default {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    pid: {
      type: "string",
    },
    path: {
      type: "string",
    },
    status: {
      type: "number",
    }
  },
  required: ["name", "pid", "path"],
  additionalProperties: false,
};
