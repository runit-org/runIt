import { Table } from "react-bootstrap";

function CustomTable({ headerItems, tableItems, tablePagination }) {
  return (
    <>
      <div className="custom-table">
        <Table responsive>
          <thead>
            <tr>{headerItems}</tr>
          </thead>
          <tbody>{tableItems}</tbody>
        </Table>
      </div>
      {tablePagination}
    </>
  );
}

function CustomTableCells({ children }) {
  return (
    <td>
      <div className="table-content">{children}</div>
    </td>
  );
}

export { CustomTable, CustomTableCells };
