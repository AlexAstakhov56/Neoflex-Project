import { useState } from "react";
import "./Table.scss";

type TableProps<T extends Record<string, unknown>> = {
  data: T[];
  headers: string[];
};

export const Table = <T extends Record<string, unknown>>({
  data,
  headers,
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const dataKeys =
    data.length > 0 ? (Object.keys(data[0]) as Array<keyof T>) : [];

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (!aValue && !bValue) return 0;
    if (!aValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (!bValue) return sortConfig.direction === "asc" ? 1 : -1;

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    return sortConfig.direction === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "desc" };
    });
  };

  const formatCellValue = (value: unknown) => {
    if (value === null) return "-";
    if (typeof value === "number") {
      return value.toLocaleString();
    }
    if (value instanceof Date) {
      return value.toLocaleDateString();
    }
    return String(value);
  };

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map((header, index) => {
            const key = dataKeys[index];
            const isSorted = sortConfig?.key === key;
            return (
              <th key={header} onClick={() => handleSort(key)}>
                <div className="table__header">
                  {header.toUpperCase()}
                  <img
                    src="/Icons/sorting_arrow.svg"
                    alt="sort_icon"
                    style={{
                      transform:
                        isSorted && sortConfig.direction === "desc"
                          ? "rotate(180deg)"
                          : "none",
                      transition: "transform 0.2s",
                    }}
                  />
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {dataKeys.map((key) => (
              <td key={String(key)}>{formatCellValue(row[key])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
