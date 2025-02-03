import React from "react";
import css from "./preloader.module.css";
import animateSvg from "../../../assets/svg/animate-loading.svg";

interface IProps {
   isFetching: boolean;
}

const Preloader: React.FC<IProps> = React.memo((props) => {
   return (
      <>
         {props.isFetching ? (
            <div className={css.loader}>
               <img width={"50px"} height={"50px"} src={animateSvg} alt="" />
            </div>
         ) : (
            ""
         )}
      </>
   );
});

export default Preloader;
