"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

import { useApproveDoctor } from "@/hooks/doctor.hook";
import { Doctor } from "@/types";

interface DoctorReviewSheetProps {
  doctor: Doctor;
}

const DoctorReviewSheet = ({ doctor }: DoctorReviewSheetProps) => {
  const [confirmRejection, setConfirmRejection] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const { mutate: approveDoctor, isPending } = useApproveDoctor();

  // Close rejection confirmation
  const handleCloseRejection = () => {
    setConfirmRejection(false);
    setRejectionReason("");
  };

  // Approve or reject doctor
  const handleReviewAction = (verificationStatus: "APPROVED" | "REJECTED") => {
    const payload = {
      doctorId: doctor.id,
      verificationStatus,
      ...(verificationStatus === "REJECTED" && {
        rejectionReason,
      }),
    };

    approveDoctor(payload, {
      onSuccess: () => {
        handleCloseRejection();
      },
    });
  };

  return (
    <Sheet
      onOpenChange={(open) => {
        if (!open) {
          handleCloseRejection();
        }
      }}
    >
      <SheetTrigger>Review</SheetTrigger>

      <SheetContent className="flex h-full flex-col overflow-hidden">
        <SheetHeader>
          <SheetTitle>Review Doctor Application</SheetTitle>

          <SheetDescription>
            Review the doctor information before taking action.
          </SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6">
          {/* Doctor name */}
          <div>
            <p className="font-medium">Name</p>
            <p className="text-muted-foreground">{doctor.name}</p>
          </div>

          {/* Email */}
          <div>
            <p className="font-medium">Email</p>
            <p className="text-muted-foreground">{doctor.email}</p>
          </div>

          {/* License number */}
          <div>
            <p className="font-medium">License Number</p>
            <p className="text-muted-foreground">{doctor.licenseNumber}</p>
          </div>

          {/* Specialization */}
          <div>
            <p className="font-medium">Specialization</p>
            <p className="text-muted-foreground">{doctor.specialization}</p>
          </div>

          {/* Qualifications */}
          <div>
            <p className="font-medium">Qualifications</p>
            <p className="text-muted-foreground">{doctor.qualifications}</p>
          </div>

          {/* Experience */}
          <div>
            <p className="font-medium">Experience</p>
            <p className="text-muted-foreground">
              {doctor.experienceYears} years
            </p>
          </div>

          {/* Contact number */}
          <div>
            <p className="font-medium">Contact Number</p>
            <p className="text-muted-foreground">
              {doctor.contactNumber ?? "N/A"}
            </p>
          </div>

          {/* Address */}
          <div>
            <p className="font-medium">Address</p>
            <p className="text-muted-foreground">{doctor.address ?? "N/A"}</p>
          </div>

          {/* Consultation fee */}
          <div>
            <p className="font-medium">Consultation Fee</p>
            <p className="text-muted-foreground">
              {doctor.consultationFee ?? "N/A"}
            </p>
          </div>

          {/* Bio */}
          <div>
            <p className="font-medium">Bio</p>
            <p className="text-muted-foreground">{doctor.bio ?? "N/A"}</p>
          </div>

          {/* Email verification */}
          <div>
            <p className="font-medium">Email Verified</p>
            <p className="text-muted-foreground">
              {doctor.user.emailVerified ? "Yes" : "No"}
            </p>
          </div>
        </div>

        <SheetFooter className="mt-auto">
          {confirmRejection ? (
            <div className="flex w-full flex-col gap-3">
              <Textarea
                value={rejectionReason}
                onChange={(event) => setRejectionReason(event.target.value)}
                placeholder="Enter rejection reason"
              />

              <div className="flex gap-2">
                <Button
                  onClick={handleCloseRejection}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  disabled={isPending}
                >
                  Cancel
                </Button>

                <Button
                  onClick={() => handleReviewAction("REJECTED")}
                  variant="destructive"
                  size="lg"
                  className="flex-1"
                  disabled={!rejectionReason.trim() || isPending}
                >
                  {isPending ? "Rejecting..." : "Confirm Rejection"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex w-full gap-2">
              <Button
                onClick={() => setConfirmRejection(true)}
                variant="destructive"
                size="lg"
                className="flex-1"
                disabled={isPending}
              >
                Reject
              </Button>

              <Button
                onClick={() => handleReviewAction("APPROVED")}
                variant="default"
                size="lg"
                className="flex-1"
                disabled={isPending}
              >
                {isPending ? "Approving..." : "Approve"}
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DoctorReviewSheet;
