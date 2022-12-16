import { Calendar, Setting3, TableDocument } from "iconsax-react";
import { NextPage } from "next";

interface MenuProps {
  onClick: React.Dispatch<React.SetStateAction<number>>;
}

const Menu = ({ onClick }: MenuProps) => {
  return (
    <ul className="menu rounded-box menu-horizontal absolute top-0 mt-20 bg-base-100">
      <li>
        <button onClick={() => onClick(0)}>
          <Calendar size="32" />
          Calendar
        </button>
      </li>
      <li>
        <button onClick={() => onClick(1)}>
          <TableDocument size="32" />
          List
        </button>
      </li>
      <li>
        <button onClick={() => onClick(2)}>
          <Setting3 size="32" />
          Settings
        </button>
      </li>
    </ul>
  );
};

export default Menu;
