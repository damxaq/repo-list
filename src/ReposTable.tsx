import React from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  TableCaption,
} from "@chakra-ui/react";

import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, Column } from "react-table";

interface Repository {
  name: HTMLElement;
  forkCount: number;
  stargazerCount: number;
}

interface FuncProps {
  tableData: Array<Repository>;
  organizationName: string;
  organizationDescription: string;
}

// Table Headers
const ReposTable = (props: FuncProps) => {
  const columns: Array<
    Column<{ name: HTMLElement; forkCount: number; stargazerCount: number }>
  > = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Stars",
        accessor: "forkCount",
      },
      {
        Header: "Forks",
        accessor: "stargazerCount",
      },
    ],
    []
  );

  // Table Data
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: props.tableData }, useSortBy);

  // Creating a link to a repo from the name of repository
  const urlCreator = (cell: string) => {
    return `https://github.com/${props.organizationName}/${cell}`;
  };

  return (
    <>
      <Table {...getTableProps()}>
        <TableCaption>{props.organizationDescription}</TableCaption>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr
              {...headerGroup.getHeaderGroupProps()}
              key={index}
              textAlign="start"
            >
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>
                    {cell.column.id === "name" ? (
                      <a href={urlCreator(cell.value)} target="_blank">
                        {cell.render("Cell")}
                      </a>
                    ) : (
                      cell.render("Cell")
                    )}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default ReposTable;
