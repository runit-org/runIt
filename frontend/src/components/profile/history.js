import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import UserProfile from "./userProfile";
import { CustomTable, CustomTableCells } from "../../layouts/customTable";
import SortDropdown from "../../layouts/sortDropdown";
import { GetVotes } from "./utilities/actionHandlers";
import { Username } from "../../layouts/username";
import Pagination from "../../layouts/pagination";

function History() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const { count, results } = GetVotes(currentPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  /*   useEffect(() => {
    const getUserList = () => {
      axios
        .get(`http://localhost:8000/api/user/vote/?page=${currentPage}`)

        .then((res) => {
          setTest([...test, ...res.data.results]);
        });
    };
    getUserList();
  }, [currentPage]); */

  return (
    <>
      <div className="content">
        <Container className="content-wrapper">
          <>
            <CustomTable
              headerItems={
                <th colSpan={2}>
                  <div className="d-flex justify-content-between align-items-center mx-2">
                    {count} votes
                    <SortDropdown />
                  </div>
                </th>
              }
              tableItems={
                results && count > 0 ? (
                  <>
                    {results.map((item, i) => {
                      return (
                        <tr key={i} className="table_row">
                          <CustomTableCells cols={"col-11"}>
                            <Username username={item.username} />
                            <small className="d-block card-timestamp text-muted align-self-center">
                              {item.email}
                            </small>
                          </CustomTableCells>

                          <CustomTableCells cols={"col-1"}>
                            <div className="d-flex img-group justify-content-center">
                              <img
                                src={item.gravatarImage}
                                className="members-img "
                                alt="Img"
                              />
                            </div>
                          </CustomTableCells>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <tr className="table_row">
                    <td className="text-center">
                      <div className="table-content">
                        <h6 className="p-0 m-0">No votes given</h6>
                      </div>
                    </td>
                  </tr>
                )
              }
              tablePagination={
                <Pagination
                  postsPerPage={postPerPage}
                  totalPosts={count}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              }
            />
          </>
        </Container>
      </div>

      <div className="sidebar_calendarDash">
        <div className="sidebar-wrapper">
          <Container className="content-wrapper">
            <Card>
              <Card.Body>
                <UserProfile />
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
    </>
  );
}

export default History;
