import {createList, homepage, showLists} from "../../utils/links.ts";

const Nav = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href={homepage}>QuickList</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a className="font-bold" href={createList}>Créer ta liste</a>
          </li>
          <li>
            <a className="font-bold" href={showLists}>Voir vos listes</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;