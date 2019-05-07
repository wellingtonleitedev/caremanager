export const userSchema = {
  name: "users",
  path: "users.realm",
  primaryKey: "id",
  properties: {
    id: { type: "int" },
    name: { type: "string" },
    email: { type: "string" },
    password: { type: "string" }
  }
};
