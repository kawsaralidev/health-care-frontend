"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import DoctorApprovalTable from "./doctor-approval-table";

const DoctorApprovalTabs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Tabs defaultValue="pending">
      {/* Search doctors */}
      <div className="mb-4">
        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by name or email"
        />
      </div>

      <TabsList>
        <TabsTrigger value="pending">Pending</TabsTrigger>

        <TabsTrigger value="approved">Approved</TabsTrigger>

        <TabsTrigger value="rejected">Rejected</TabsTrigger>

        <TabsTrigger value="all">All</TabsTrigger>
      </TabsList>

      {/* Pending doctors */}
      <TabsContent value="pending">
        <DoctorApprovalTable status="PENDING" searchTerm={searchTerm} />
      </TabsContent>

      {/* Approved doctors */}
      <TabsContent value="approved">
        <DoctorApprovalTable status="APPROVED" searchTerm={searchTerm} />
      </TabsContent>

      {/* Rejected doctors */}
      <TabsContent value="rejected">
        <DoctorApprovalTable status="REJECTED" searchTerm={searchTerm} />
      </TabsContent>

      {/* All doctors */}
      <TabsContent value="all">
        <DoctorApprovalTable searchTerm={searchTerm} />
      </TabsContent>
    </Tabs>
  );
};

export default DoctorApprovalTabs;
