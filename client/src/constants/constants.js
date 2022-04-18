export const apiURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api/v1"
    : "SomeDeployURL";
export const socketURL =
  process.env.NODE_ENV !== "production"
    ? "ws://localhost:5000"
    : "SomeDeployURL";
