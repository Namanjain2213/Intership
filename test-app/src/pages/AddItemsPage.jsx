import AddItems from "../components/AddItems";
import { useNavigate } from "react-router-dom";

export default function AddItemsPage() {
  const navigate = useNavigate();

  const handleAdd = (item) => {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
    navigate("/");
  };

  return <AddItems onAdd={handleAdd} />;
}
