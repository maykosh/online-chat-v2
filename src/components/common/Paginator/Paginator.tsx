import React, { useMemo } from "react";
import css from "./paginator.module.css";
import cn from "classnames";
import { PaginatorType } from "../../../redux/paginator-reducer";

interface IProps {
   currentPage: number;
   onPageChanged: (pageNumber: number) => void;
   totalCount: number;
   pageSize: number;
   portionSize: number;
   paginatorKey: string | number;
   paginator: PaginatorType;
   onSetPaginator: (
      paginatorKey: string | number,
      portionNumber: number
   ) => void;
}

const Paginator: React.FC<IProps> = React.memo((props) => {
   const {
      currentPage,
      onPageChanged,
      totalCount,
      pageSize,
      portionSize,
      paginatorKey,
      paginator,
      onSetPaginator,
   } = props;

   const pageCount = Math.ceil(totalCount / pageSize);

   const page = useMemo(
      () => Array.from({ length: pageCount }, (_, i) => i + 1),
      [pageCount]
   );
   const portionNumber = paginator[paginatorKey] || 1;

   const portionCount = Math.ceil(pageCount / portionSize);

   const portionLeftPageNumber = (portionNumber - 1) * portionSize + 1;

   const portionRightPageNumber = portionSize * portionNumber;

   const filteredPage = useMemo(
      () =>
         page.filter(
            (p) => p >= portionLeftPageNumber && p <= portionRightPageNumber
         ),
      [portionLeftPageNumber, portionRightPageNumber, page]
   );

   const goToPrevPortion = (portionSize: number) => {
      onSetPaginator(paginatorKey, portionNumber - 1);
      onPageChanged(portionLeftPageNumber - portionSize);
   };

   const goToNextPortion = () => {
      onSetPaginator(paginatorKey, portionNumber + 1);
      onPageChanged(portionRightPageNumber + 1);
   };

   const goToNextPage = () => {
      onPageChanged(currentPage + 1);
      if (portionRightPageNumber === currentPage) goToNextPortion();
   };

   const goToPrevPage = () => {
      onPageChanged(currentPage - 1);
      if (portionLeftPageNumber === currentPage) goToPrevPortion(1);
   };

   return (
      <div className={css.paginator}>
         {portionNumber > 1 && (
            <>
               <button
                  onClick={() => goToPrevPortion(portionSize)}
                  className={css.next}
               >
                  {"<<"}
               </button>
               <button onClick={goToPrevPage} className={css.next}>
                  {"<"}
               </button>
            </>
         )}

         <div className={css.pagination}>
            {filteredPage.map((p) => (
               <span
                  key={p}
                  onClick={() => onPageChanged(p)}
                  className={cn({ [css.active]: currentPage === p })}
               >
                  {p}
               </span>
            ))}
         </div>

         {portionNumber < portionCount && (
            <>
               <button onClick={goToNextPage} className={css.next}>
                  {">"}
               </button>
               <button onClick={goToNextPortion} className={css.next}>
                  {">>"}
               </button>
            </>
         )}
      </div>
   );
});

export default Paginator;
