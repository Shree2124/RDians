export type Role = "admin" | "citizen" | "volunteer" | "coordinator" | "agency";

export interface DummyUser {
  email: string;
  password: string;
  role: Role;
}

export const dummyUsers: DummyUser[] = [
  { email: "admin@gmail.com", password: "Admin@123", role: "admin" },
  { email: "citizen@gmail.com", password: "Citizen@123", role: "citizen" },
  { email: "volunteer@gmail.com", password: "Volunteer@123", role: "volunteer" },
  { email: "coordinator@gmail.com", password: "Coordinator@123", role: "coordinator" },
  { email: "agency@gmail.com", password: "Agency@123", role: "agency" },
];
