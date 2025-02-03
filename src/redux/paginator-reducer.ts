const SET_PAGINATOR = "paginatorReducer/SET-PAGINATOR";

export type PaginatorType = {
   [key: string | number]: number;
};

const initialState: PaginatorType = {};

const paginatorReducer = (state: PaginatorType = initialState, action: ActionType): PaginatorType => {
   switch (action.type) {
      case SET_PAGINATOR: {
         const { paginatorKey, portionNumber } = action.payload;
         return {
            ...state,
            [paginatorKey]: portionNumber,
         };
      }
      default:
         return state;
   }
};

type ActionType = SetPaginatorType

type SetPaginatorType = {
   type: typeof SET_PAGINATOR;
   payload: { paginatorKey: number | string; portionNumber: number };
};

export const setPaginator = (
   paginatorKey: string | number,
   portionNumber: number
): SetPaginatorType => ({
   type: SET_PAGINATOR,
   payload: { paginatorKey, portionNumber },
});

export default paginatorReducer;
