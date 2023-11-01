import Table from "react-bootstrap/Table";

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

function CustomTableCells({ children, cols }) {
  return (
    <td className={cols}>
      <div className="table-content">{children}</div>
    </td>
  );
}

export { CustomTable, CustomTableCells };
