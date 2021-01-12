import React, { useState } from "react";
import styles from "./Pagination.module.css";
import cn from "classnames"
import right_btn from "../../../assets/icons/right.png"
import left_btn from "../../../assets/icons/left.png"

let Pagination = ({
  currentPage,
  totalItemsCount,
  pageSize,
  onPageChanged,
  portionSize = 10,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={styles.paginator}>
      {portionNumber > 1 && (
        <div className={styles.prev_btn}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          <img src={left_btn} alt="left"/>
        </div>
      )}

      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p, index) => {
          return (
            <span
              className={cn(
                {[styles.selectedPage]: currentPage === p,},
                styles.pageNumber
              )}
              onClick={() => {onPageChanged(p);}}
              key={index}
            > {p} </span>
          );
        })}

      {portionCount > portionNumber && (
        <div className={styles.next_btn}
          onClick={() => {setPortionNumber(portionNumber + 1);}}> 
          <img src={right_btn} alt="right"/>
        </div>
      )}
    </div>
  );
};

export default Pagination;
