export const userSchema = {
  name: "users",
  primaryKey: "id",
  properties: {
    id: { type: "int" },
    name: { type: "string" },
    email: { type: "string", indexed: true },
    password: { type: "string" }
  }
};
