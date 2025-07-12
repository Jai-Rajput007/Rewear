export default function ItemDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Item Details</h1>
      <p>Details for item: {params.id}</p>
    </div>
  );
}
