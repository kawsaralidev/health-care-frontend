"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DoctorApprovalTable from "./doctor-approval-table";

const DoctorApprovalTabs = () => {
  return (
    <Tabs defaultValue="pending">
      <TabsList>
        <TabsTrigger value="pending">Pending</TabsTrigger>

        <TabsTrigger value="approved">Approved</TabsTrigger>

        <TabsTrigger value="rejected">Rejected</TabsTrigger>

        <TabsTrigger value="all">All</TabsTrigger>
      </TabsList>

      {/* Pending doctors */}
      <TabsContent value="pending">
        <DoctorApprovalTable status="PENDING" />
      </TabsContent>

      {/* Approved doctors */}
      <TabsContent value="approved">
        <DoctorApprovalTable status="APPROVED" />
      </TabsContent>

      {/* Rejected doctors */}
      <TabsContent value="rejected">
        <DoctorApprovalTable status="REJECTED" />
      </TabsContent>

      {/* All doctors */}
      <TabsContent value="all">
        <DoctorApprovalTable />
      </TabsContent>
    </Tabs>
  );
};

export default DoctorApprovalTabs;
