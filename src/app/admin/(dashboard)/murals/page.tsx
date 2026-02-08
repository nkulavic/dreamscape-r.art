import Link from "next/link";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { desc } from "drizzle-orm";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MuralActions from "./MuralActions";

export default async function MuralsListPage() {
  const murals = await db
    .select()
    .from(schema.murals)
    .orderBy(desc(schema.murals.year));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl tracking-wide text-gray-900">
            Murals
          </h1>
          <p className="mt-1 font-heading text-sm text-gray-500">
            Manage all mural entries.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/murals/new">
            <Plus className="h-4 w-4" />
            Add New Mural
          </Link>
        </Button>
      </div>

      <div className="mt-8 rounded-xl bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {murals.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-gray-500"
                >
                  No murals found. Create your first mural to get started.
                </TableCell>
              </TableRow>
            )}
            {murals.map((mural) => (
              <TableRow key={mural.id}>
                <TableCell className="font-medium">{mural.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {mural.category}
                  </Badge>
                </TableCell>
                <TableCell>{mural.city}</TableCell>
                <TableCell>{mural.year}</TableCell>
                <TableCell>
                  {mural.featured ? (
                    <Badge className="bg-green-100 text-green-800">Yes</Badge>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <MuralActions id={mural.id} title={mural.title} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
