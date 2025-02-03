import React from "react";
import { useParams } from "react-router-dom";

export const withRouter = (Component: React.ComponentType<any>) => {
   return (props: any) => {
      const { userId } = useParams<{ userId: string }>();
      return <Component {...props} userId={userId} />;
   };
};
