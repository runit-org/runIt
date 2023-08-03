import { Table } from "react-bootstrap";

function CustomTable({ headerItems, tableItems }) {
  return (
    <div className="custom-table">
      <Table responsive>
        <thead>
          <tr>{headerItems}</tr>
        </thead>
        <tbody>{tableItems}</tbody>
        <tbody></tbody>
      </Table>
    </div>
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
