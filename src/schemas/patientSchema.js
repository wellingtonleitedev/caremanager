export const patientSchema = {
  name: "patients",
  primaryKey: "id",
  properties: {
    id: { type: "int" },
    name: { type: "string" },
    hospital: { type: "string" },
    enable: { type: "bool", default: true }
  }
};
