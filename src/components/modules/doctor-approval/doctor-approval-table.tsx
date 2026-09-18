"use client";

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DoctorApprovalTableLoading from "./doctor-approval-table-loading";
import { useGetAllDoctors } from "@/hooks/doctor.hook";
import { DoctorVerificationStatus } from "@/types";

import DoctorReviewSheet from "./doctor-review-sheet";

interface DoctorApprovalTableProps {
  status?: DoctorVerificationStatus;
  searchTerm?: string;
}

const skeletonRows = [
  "skeleton-1",
  "skeleton-2",
  "skeleton-3",
  "skeleton-4",
  "skeleton-5",
];

const DoctorApprovalTable = ({
  status,
  searchTerm,
}: DoctorApprovalTableProps) => {
  const [page, setPage] = useState(1);

  const limit = 10;

  const { data, isLoading, isError } = useGetAllDoctors({
    page,
    limit,
    ...(status && {
      verificationStatus: status,
    }),
    ...(searchTerm && {
      searchTerm,
    }),
  });

  if (isLoading) {
    return <DoctorApprovalTableLoading />;
  }

  // Error state
  if (isError) {
    return <div className="rounded-lg border p-5">Failed to load doctors.</div>;
  }

  const doctors = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

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
                  {!doctor.user.emailVerified ? (
                    <span className="py-4 text-red-500">Not verified</span>
                  ) : (
                    doctor.verificationStatus === "PENDING" && (
                      <DoctorReviewSheet doctor={doctor} />
                    )
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t p-4">
          <Button
            variant="outline"
            onClick={() => setPage((currentPage) => currentPage - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>

          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </p>

          <Button
            variant="outline"
            onClick={() => setPage((currentPage) => currentPage + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default DoctorApprovalTable;
