import MuralForm from "../MuralForm";

export default function NewMuralPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-4xl tracking-wide text-gray-900">
          New Mural
        </h1>
        <p className="mt-1 font-heading text-sm text-gray-500">
          Create a new mural entry.
        </p>
      </div>

      <MuralForm />
    </div>
  );
}
