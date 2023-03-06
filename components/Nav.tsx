import Link from 'next/link';

import { AiOutlineHeatMap } from 'react-icons/ai';
import style from '../sass/Nav.module.scss';

export default function Nav() {
	//style
	const liLink = `${style.link_li} ${style.link}`;

	return (
		<div className={style.nav}>
			<Link href='/map' className={`${style.logo} ${style.link}`}>
				<AiOutlineHeatMap className={style.logoIcon} />
				<p>map-app</p>
			</Link>

			<ul className={style.list}>
				<li>
					<Link href='/map' className={liLink}>
						Mapa
					</Link>
				</li>
				<li>
					<Link href='/' className={liLink}>
						Kontakt
					</Link>
				</li>
				<li>
					<Link href='/test' className={liLink}>
						Test
					</Link>
				</li>
			</ul>
		</div>
	);
}
