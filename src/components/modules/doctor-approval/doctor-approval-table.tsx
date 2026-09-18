"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetAllDoctors } from "@/hooks/doctor.hook";
import { DoctorVerificationStatus } from "@/types";

import DoctorReviewSheet from "./doctor-review-sheet";

interface DoctorApprovalTableProps {
  status?: DoctorVerificationStatus;
  searchTerm?: string;
}

const DoctorApprovalTable = ({
  status,
  searchTerm,
}: DoctorApprovalTableProps) => {
  const { data, isLoading, isError } = useGetAllDoctors({
    page: 1,
    limit: 10,
    ...(status && {
      verificationStatus: status,
    }),
    ...(searchTerm && {
      searchTerm,
    }),
  });

  // Loading state
  if (isLoading) {
    return <div className="rounded-lg border p-5">Loading doctors...</div>;
  }

  // Error state
  if (isError) {
    return <div className="rounded-lg border p-5">Failed to load doctors.</div>;
  }

  const doctors = data?.data ?? [];

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>License No.</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact No.</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {doctors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No doctors found.
              </TableCell>
            </TableRow>
          ) : (
            doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell className="font-medium">{doctor.name}</TableCell>

                <TableCell>{doctor.licenseNumber}</TableCell>

                <TableCell>{doctor.email}</TableCell>

                <TableCell>{doctor.contactNumber ?? "N/A"}</TableCell>

                <TableCell>{doctor.specialization}</TableCell>

                <TableCell className="text-right">
                  {doctor.verificationStatus === "PENDING" && (
                    <DoctorReviewSheet doctor={doctor} />
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DoctorApprovalTable;
