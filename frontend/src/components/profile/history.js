import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";

import UserProfile from "./userProfile";
import { CustomTable, CustomTableCells } from "../../layouts/customTable";
import SortDropdown from "../../layouts/sortDropdown";
import { GetVotes } from "./utilities/actionHandlers";
import { Username } from "../../layouts/username";
import Pagination from "../../layouts/pagination";
import { useLocation, useSearchParams } from "react-router-dom";
import { usePageId } from "../../hooks/usePageId";

function History() {
  //pagination
  let pageId = usePageId();
  const { state } = useLocation();
  const [postPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams({});
  const { count, results } = GetVotes(pageId);

  useEffect(() => {
    if (state) {
      const { id } = state;
      setCurrentPage(id);
    }
  }, [state]);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [setSearchParams, currentPage]);

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
                          <CustomTableCells>
                            <Username username={item.username} />
                            <small className="d-block card-timestamp text-muted align-self-center">
                              {item.email}
                            </small>
                          </CustomTableCells>

                          <CustomTableCells>
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
