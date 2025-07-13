'use client';

import Link from 'next/link';
import css from './TagsMenu.module.css';
import { useState } from 'react';

const TagsMenu = () => {
	const tags: string[] = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	const handleOpenMenu = () => {
		setIsOpenMenu(!isOpenMenu);
	};
	return (
		<div className={css.menuContainer}>
			<button className={css.menuButton} onClick={handleOpenMenu}>
				Notes ▾
			</button>
			{isOpenMenu && (
				<ul className={css.menuList}>
					<li className={css.menuItem}>
						<Link href={`/notes/filter/all`} className={css.menuLink}>
							All notes
						</Link>
					</li>
					{tags.map(tag => (
						<li className={css.menuItem} key={tag}>
							<Link href={`/notes/filter/${tag}`} className={css.menuLink}>
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
