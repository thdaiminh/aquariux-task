import React from "react";
import { IconSearch } from "@/components/icons/IconSearch.tsx";
import { IconDeleteBin } from "@/components/icons/IconDeleteBin.tsx";
import type { HistoryItem } from "@/types/history.ts";

interface SearchHistoryProps {
  history: HistoryItem[];
  onSelect: (city: HistoryItem) => void;
  onDelete: (city: HistoryItem) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  history,
  onSelect,
  onDelete,
}) => {
  if (history.length === 0) return <p>No search history.</p>;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Search History</h3>
      <div className="flex flex-col gap-2 bg-white rounded-xl px-4 py-6 border-neutral-300 border-1 mt-2">
        {history.map((item) => (
          <div key={item.city} className="flex justify-between gap-2">
            <span className="text-lg">
              {item.city}, {item.cityCode}
            </span>
            <div className="flex gap-2">
              <button
                className="cursor-pointer rounded-md hover:bg-blue-600  hover:text-white p-2 transition-colors"
                onClick={() => onSelect(item)}
              >
                <IconSearch width={16} height={16} />
              </button>
              <button
                onClick={() => onDelete(item)}
                className="cursor-pointer rounded-md hover:bg-red-600 hover:text-white p-2 transition-colors"
                aria-label={`Delete ${item}`}
              >
                <IconDeleteBin width={16} height={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
