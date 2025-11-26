import { Report_Categories } from "../../constants/reportCategories";

export default function CategorySelector({ selected, onSelect }) {
  return (
    <div className="flex justify-between w-full px-10 mt-5">
      {Report_Categories.map((cat) => (
        <div key={cat.id} className="flex flex-col items-center">
          <button
            onClick={() => onSelect(cat.id)}
            className={`
              w-20 h-20 rounded-full flex items-center justify-center
              ${selected === cat.id ? "bg-[#6F42C1]" : "bg-purple-300"}
            `}
          >
            <img src={cat.icon} alt={cat.label} className="w-10 h-10" />
          </button>
          <span className="mt-2 text-sm font-medium text-black">
            {cat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
