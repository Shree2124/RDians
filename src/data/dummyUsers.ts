export type Role = "admin" | "citizen" | "volunteer" | "coordinator" | "agency";

export interface DummyUser {
  username: string;
  password: string;
  role: Role;
}

export const dummyUsers: DummyUser[] = [
  { username: "admin_user", password: "admin123", role: "admin" },
  { username: "citizen_user", password: "citizen123", role: "citizen" },
  { username: "volunteer_user", password: "volunteer123", role: "volunteer" },
  { username: "coordinator_user", password: "coordinator123", role: "coordinator" },
  { username: "agency_user", password: "agency123", role: "agency" },
];
