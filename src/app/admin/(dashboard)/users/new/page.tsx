import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import UserForm from "../UserForm";

export default function NewUserPage() {
  return (
    <div>
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Users
      </Link>

      <h1 className="mt-4 font-display text-4xl tracking-wide text-gray-900">
        Add New User
      </h1>
      <p className="mt-1 font-heading text-sm text-gray-500">
        Create a new user account.
      </p>

      <div className="mt-8">
        <UserForm />
      </div>
    </div>
  );
}
