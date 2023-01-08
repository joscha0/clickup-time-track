import { Calendar, Setting3, TableDocument } from "iconsax-react";
import Image from "next/image";

interface MenuProps {
  onClick: React.Dispatch<React.SetStateAction<number>>;
}

const Menu = ({ onClick }: MenuProps) => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

      <ul className="menu w-80 bg-base-100 p-4 text-base-content">
        <h1 className="text-center font-bold">ClickUp</h1>
        <h4 className="text-center">Time Track</h4>
        <div className="divider"></div>
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
        <li className="menu-title">
          <span>Links</span>
        </li>
        <li>
          <a
            href="https://github.com/joscha0/clickup-time-track"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/github-mark-white.svg" alt="" width={32} height={32} />
            Github
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
