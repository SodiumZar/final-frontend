// User Statistics Component
export default function UserStats() {
  return (
    <div className="flex gap-4">
    <div className="bg-purple-600 text-white p-6 rounded-xl w-100 flex items-center justify-center gap-4">
        <h1 className="text-xl font-semibold">Reports Submitted</h1>
        <p className="text-4xl font-bold">5</p>
      </div>

      <div className="bg-yellow-400 text-white p-6 rounded-xl w-100 flex items-center justify-center gap-4">
        <h1 className="text-xl font-semibold">Resolved Issues</h1>
        <p className="text-4xl font-bold">3</p>
      </div>
    </div>
  );
}