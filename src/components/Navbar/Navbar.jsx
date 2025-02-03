import { NavLink } from "react-router-dom";
import css from "./navbar.module.css";
const data = [
  {
    id: 1,
    to: "/profile",
    title: "профиль",
  },
  {
    id: 2,
    to: "/message",
    title: "сообщение",
  },
  {
    id: 3,
    to: "/settings",
    title: "настройки",
  },
  {
    id:4,
    to: "/users",
    title: "найти друзей",
  }
];
const Navbar = () => {
  return (
    <div className={css.container}>
      {data.map((el) => (
        <div key={el.id} className={css.item}>
          <NavLink
            className={({ isActive }) => (isActive ? css.activeLink : "")}
            to={el.to}
          >
            {el.title}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
