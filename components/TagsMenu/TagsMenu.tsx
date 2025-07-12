"use client";

import Link from "next/link";
import css from "./TagsMenu.module.css";
import { useState } from "react";

const TagsMenu = () => {
  const tags: string[] = ["Work", "Personal", "Meeting", "Shopping", "Todo"];
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleCloseMenu = () => {
    setIsOpenMenu(false);
  };

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={handleOpenMenu}>
        Notes ▾
      </button>
      {isOpenMenu && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/all`}
              className={css.menuLink}
              onClick={handleCloseMenu}
            >
              All notes
            </Link>
          </li>
          {tags.map((tag) => (
            <li className={css.menuItem} key={tag}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={handleCloseMenu}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
