import Link from "next/link";

import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Patient Dashboard</h1>

        <p className="text-muted-foreground">
          Manage your appointments and healthcare activities.
        </p>
      </div>

      <Button
        render={<Link href="/dashboard/my-appointments" />}
        nativeButton={false}
      >
        My Appointments
      </Button>
    </div>
  );
};

export default DashboardPage;
