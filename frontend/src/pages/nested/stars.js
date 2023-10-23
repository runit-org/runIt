import React from "react";
import { Card, Container } from "react-bootstrap";
import { CustomTable, CustomTableCells } from "../../layouts/customTable";
import SortDropdown from "../../layouts/sortDropdown";
import { GetVotes } from "../../components/profile/helper/actionHandlers";
import { Username } from "../../layouts/user/username";
import CTAButton from "../../layouts/ctaButton";
import { Loading } from "../../layouts/loader";
import CurrentUserProfile from "../../components/profile/currentUserProfile";
import Vote from "../../components/profile/vote";

function Stars() {
  // const affiliatedEvents = AffiliatedEvents(2);
  const { count, hasMore, load, votesList, handleLoadMore } = GetVotes();
  return (
    <>
      <div className="content">
        <Container className="content-wrapper">
          <>
            <CustomTable
              headerItems={
                <th colSpan={2}>
                  <div className="d-flex justify-content-between align-items-center mx-2">
                    Starred {count}
                    <SortDropdown />
                  </div>
                </th>
              }
              tableItems={
                count > 0 ? (
                  <>
                    {votesList.map((item, i) => {
                      return (
                        <tr key={i} className="table_row">
                          <CustomTableCells cols={"col-11"}>
                            <Username username={item.username} />
                            <small className="d-block card-timestamp text-muted align-self-center">
                              {item.email}
                            </small>
                            <div className="mt-2">
                              <Vote user={item} fullW={false} />
                            </div>
                          </CustomTableCells>

                          <CustomTableCells cols={"col-1"}>
                            <img
                              src={item.gravatarImage}
                              className="members-img "
                              alt="Img"
                            />
                          </CustomTableCells>
                        </tr>
                      );
                    })}
                  </>
                ) : !load && count === 0 ? (
                  <tr className="table_row">
                    <td className="text-center">
                      <div className="table-content">
                        <h6 className="p-0 m-0">
                          You don't have any starred users yet.
                        </h6>
                        <small>
                          Star users you collaborate with often and they'll show
                          up here.
                        </small>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr className="table_row">
                    <td className="text-center">
                      <Loading />
                    </td>
                  </tr>
                )
              }
              tablePagination={
                hasMore && (
                  <CTAButton
                    type={"submit"}
                    btnStyle={"formBtn cta_button d-block mt-2 w-100"}
                    variant={"primary"}
                    isLoading={load}
                    onClick={handleLoadMore}
                    placeholder={
                      <div className="d-flex align-items-center justify-content-center">
                        Show more
                      </div>
                    }
                  />
                )
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
                <CurrentUserProfile />
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Stars;
