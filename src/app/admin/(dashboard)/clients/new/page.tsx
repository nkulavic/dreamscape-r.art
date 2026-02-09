import ClientForm from "../[id]/edit/ClientForm";

export default function NewClientPage() {
  return (
    <div>
      <h1 className="font-display text-4xl tracking-wide text-gray-900">
        Add New Client
      </h1>
      <p className="mt-1 font-heading text-sm text-gray-500">
        Create a new client entry.
      </p>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <ClientForm />
      </div>
    </div>
  );
}
