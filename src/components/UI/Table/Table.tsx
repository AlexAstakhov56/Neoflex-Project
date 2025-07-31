import { useMemo, useState } from "react";
import "./Table.scss";

type SortDirection = "asc" | "desc";
type SortConfig<T> = {
  key: keyof T;
  direction: SortDirection;
} | null;

type TableProps<T extends Record<string, unknown>> = {
  data: T[];
  headers: string[];
};

export const Table = <T extends Record<string, unknown>>({
  data,
  headers,
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(null);
  const dataKeys =
    data.length > 0 ? (Object.keys(data[0]) as Array<keyof T>) : [];

  const handleSort = (key: keyof T) => {
    let direction: SortDirection = "asc";
    if (sortConfig?.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    } else {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  const sortData = (data: T[], config: SortConfig<T>) => {
    if (!config) return data;

    return [...data].sort((a, b) => {
      const aValue = a[config.key];
      const bValue = b[config.key];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return config.direction === "asc" ? -1 : 1;
      if (bValue == null) return config.direction === "asc" ? 1 : -1;

      if (typeof aValue === "number" && typeof bValue === "number") {
        return config.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      const aString = String(aValue);
      const bString = String(bValue);

      return config.direction === "asc"
        ? aString.localeCompare(bString)
        : bString.localeCompare(aString);
    });
  };

  const sortedData = useMemo(() => {
    if (data.length === 0) return [];
    return sortData(data, sortConfig);
  }, [data, sortConfig, dataKeys]);

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
              <th
                key={header}
                onClick={() => handleSort(key)}
                style={{ cursor: "pointer" }}
              >
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
              <td key={`${String(key)}-${rowIndex}`}>
                {formatCellValue(row[key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
