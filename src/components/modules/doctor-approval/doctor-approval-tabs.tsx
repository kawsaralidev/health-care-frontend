import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DoctorReviewSheet from "./doctor-review-sheet";

const DoctorApprovalTable = () => {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Mir Hussain</TableCell>

            <TableCell className="text-right">
              <DoctorReviewSheet />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default DoctorApprovalTable;
