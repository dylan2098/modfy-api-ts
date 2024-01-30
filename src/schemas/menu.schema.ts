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
  },
  required: ["name", "pid", "path"],
  additionalProperties: false,
};
