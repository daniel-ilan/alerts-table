import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import {CircularProgress, Table as MuiTable, Pagination, TableBody, TableHead, TableRow}  from "@mui/material";
import { ColumnDef, ColumnFilter, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { TableCell } from "./style";
import { useEffect, useMemo, useState } from "react";

export interface FilterValues {
  [key: string]: string;
}

interface TableProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  filterValues?: FilterValues | null;
}

const Table = <T extends unknown & {},>({ columns, data, filterValues }: TableProps<T>) => {

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);


  useEffect(() => {
    
    const newFilterValues = Object.entries(filterValues || {})
    if (!newFilterValues.length || !filterValues) {
      setColumnFilters([]);
      return;
    }
    const newColumnFilters = structuredClone(columnFilters);
    Object.entries(filterValues).forEach(([filterKey, value]) => {
      const index = columnFilters.findIndex((x: ColumnFilter) => x.id === filterKey)
      if (index > -1) {
        newColumnFilters[index].value = filterValues[filterKey]
      } else {
        newColumnFilters.push({ id: filterKey, value })
      }
    });
    setColumnFilters(newColumnFilters);


  }, [filterValues]);


  const table = useReactTable({
    data,
    columns,
    renderFallbackValue: "No data",
    state: {
      columnFilters,
    },
    enableSorting: data.length > 0,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
      <MuiTable >
        <TableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                  const meta = header.column.columnDef.meta;                  
                return (
                  <TableCell showBorder={!!meta?.borderRight} width={meta?.constWidth} variant="head" key={header.id} colSpan={header.colSpan} >
                    {header.isPlaceholder ? null : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          { table?.getRowModel().rows?.map(row => (

            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => {
                const meta = cell.column.columnDef.meta;
                return (
                  <TableCell showBorder={!!meta?.borderRight} key={cell.id} width={meta?.constWidth}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
        
      </MuiTable>
      {data.length > 0 ? <Pagination count={1} showFirstButton showLastButton /> : null}
    </div>

  );
}

export default Table;