import React from "react";
import { Container, Pagination as PaginateStyle, Row } from "react-bootstrap";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Row className="p-4">
      <PaginateStyle className="col-12 col-md-8 col-lg-8 col-xl-8">
        <Container className="d-flex justify-content-center">
          <PaginateStyle.Prev
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {currentPage != 1 && pageNumbers.length > 5 ? (
            <>
              <PaginateStyle.First
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
              >
                1
              </PaginateStyle.First>
              <PaginateStyle.Ellipsis disabled />
            </>
          ) : (
            ""
          )}

          {pageNumbers.map((number, index) => (
            <div key={index}>
              <PaginateStyle.Item
                active={number === currentPage}
                onClick={() => paginate(number)}
                href="#"
              >
                {number}
              </PaginateStyle.Item>
            </div>
          ))}

          {currentPage != pageNumbers.length && pageNumbers.length > 5 ? (
            <>
              <PaginateStyle.Ellipsis disabled />
              <PaginateStyle.Last
                onClick={() => paginate(pageNumbers.length)}
                disabled={currentPage === pageNumbers.length}
              >
                {pageNumbers.length}
              </PaginateStyle.Last>
            </>
          ) : (
            ""
          )}
          <PaginateStyle.Next
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
          />
        </Container>
      </PaginateStyle>
    </Row>
  );
};
export default Pagination;
