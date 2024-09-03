import React from "react";
import { Box, Button } from "@mui/material";

const Pagination = ({
  currentPage,
  numberOfPages,
  handlePrevPage,
  handleNextPage,
  handlePageNumberClick,
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxPageButtons = 5; 

    if (numberOfPages <= maxPageButtons) {
     
      for (let i = 1; i <= numberOfPages; i++) {
        pages.push(
          <Button
            key={i}
            onClick={() => handlePageNumberClick(i)}
            color={currentPage === i ? "primary" : "default"}
          >
            {i}
          </Button>
        );
      }
    } else {
     
      if (currentPage > 2) {
        pages.push(
          <Button key={1} onClick={() => handlePageNumberClick(1)}>
            1
          </Button>
        );
      }

      if (currentPage > 3) {
        pages.push(<span key="ellipsis-left">...</span>);
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(numberOfPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <Button
            key={i}
            onClick={() => handlePageNumberClick(i)}
            color={currentPage === i ? "primary" : "default"}
          >
            {i}
          </Button>
        );
      }

      if (currentPage < numberOfPages - 2) {
        pages.push(<span key="ellipsis-right">...</span>);
      }

      if (currentPage < numberOfPages - 1) {
        pages.push(
          <Button
            key={numberOfPages}
            onClick={() => handlePageNumberClick(numberOfPages)}
          >
            {numberOfPages}
          </Button>
        );
      }
    }

    return pages;
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      <Button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous
      </Button>
      {renderPageNumbers()}
      <Button onClick={handleNextPage} disabled={currentPage === numberOfPages}>
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
