import React from "react";
// HOC - (HIGH ORDER COMPONENT)
export const withSuspens = <T extends object>(Component: React.ComponentType<T>) => {
   const SuspensedComponent = (props: T) => (
      <React.Suspense fallback={<div>Loading...</div>}>
         <Component {...props} />
      </React.Suspense>
   );
   return SuspensedComponent;
};
