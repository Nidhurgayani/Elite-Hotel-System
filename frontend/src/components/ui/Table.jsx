import { useState } from "react";

export default function Table({ columns, data, renderActions }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (col) => {
    const key = cKey(col);
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }

    return sortAsc
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  return (
    <div className="overflow-x-auto bg-white border rounded">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((c) => (
              <th
                key={c}
                onClick={() => handleSort(c)}
                className="text-left px-3 py-2 font-semibold text-gray-700 cursor-pointer select-none"
              >
                {c}
                {sortKey === cKey(c) && (sortAsc ? " ▲" : " ▼")}
              </th>
            ))}
            {renderActions && <th className="px-3 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row.id} className="border-t">
              {columns.map((c) => (
                <td key={c} className="px-3 py-2">
                  {row[cKey(c)]}
                </td>
              ))}
              {renderActions && (
                <td className="px-3 py-2">{renderActions(row)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function cKey(col) {
  // Normalize column header to object key used in rows
  return col.toLowerCase().replace(/\s+/g, " ").trim();
}