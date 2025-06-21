export default function ItemCard({ item, onClick }) {
  return (
    <div onClick={onClick} className="cursor-pointer p-2 bg-white rounded shadow">
      <img src={item.coverImage} className="w-full h-40 object-cover rounded" />
      <h2 className="text-center mt-2 font-bold">{item.name}</h2>
    </div>
  );
}
