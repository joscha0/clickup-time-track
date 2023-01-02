import { Calendar, Setting3, TableDocument } from "iconsax-react";

interface MenuProps {
  onClick: React.Dispatch<React.SetStateAction<number>>;
}

const Menu = ({ onClick }: MenuProps) => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu w-80 bg-base-100 p-4 text-base-content">
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
    </div>
  );
};

export default Menu;
