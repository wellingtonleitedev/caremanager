export const patientSchema = {
  name: "patients",
  primaryKey: "id",
  properties: {
    id: { type: "int" },
    name: { type: "string" },
    user_id: { type: "int", default: 1 },
    hospital: { type: "string" },
    enabled: { type: "bool", default: true, indexed: true }
  }
};
