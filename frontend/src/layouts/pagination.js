import React from "react";
import { Container, Pagination as PaginateStyle } from "react-bootstrap";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="paginate_div">
      <PaginateStyle size="sm">
        <Container
          className="d-flex justify-content-center"
          id="pagi-container"
        >
          <PaginateStyle.Prev
            id="prev"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </PaginateStyle.Prev>
          {currentPage !== 1 && pageNumbers.length > 5 && (
            <>
              <PaginateStyle.First
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
              >
                1
              </PaginateStyle.First>
              <PaginateStyle.Ellipsis disabled />
            </>
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

          {currentPage !== pageNumbers.length && pageNumbers.length > 5 && (
            <>
              <PaginateStyle.Ellipsis disabled />
              <PaginateStyle.Last
                onClick={() => paginate(pageNumbers.length)}
                disabled={currentPage === pageNumbers.length}
              >
                {pageNumbers.length}
              </PaginateStyle.Last>
            </>
          )}
          <PaginateStyle.Next
            id="next"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
          >
            Next
          </PaginateStyle.Next>
        </Container>
      </PaginateStyle>
    </div>
  );
};
export default Pagination;
