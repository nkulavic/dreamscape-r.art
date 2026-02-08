import VideoForm from "../[id]/edit/VideoForm";

export default function NewVideoPage() {
  return (
    <div>
      <h1 className="font-display text-4xl tracking-wide text-gray-900">
        Add New Video
      </h1>
      <p className="mt-1 font-heading text-sm text-gray-500">
        Upload a new video to your library.
      </p>

      <div className="mt-8">
        <VideoForm />
      </div>
    </div>
  );
}
