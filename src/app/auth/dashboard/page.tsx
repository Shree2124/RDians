import AuthLayout from "@/components/layouts/AuthLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function DashboardPage() {
  return (
    <AuthLayout allowedRoles={["admin", "user"]}>
      <DashboardLayout>
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>
      </DashboardLayout>
    </AuthLayout>
  );
}
