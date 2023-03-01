import style from '../sass/Nav.module.scss';
import { AiOutlineHeatMap } from 'react-icons/ai';

export default function Nav() {
	return (
		<div className={style.nav}>
			<div className={style.logo}>
				<AiOutlineHeatMap className={style.logoIcon} />
				<p>map-app</p>
			</div>
			<ul className={style.list}>
				<li>Mapa</li>
				<li>Kontakt</li>
				<li>Coś tam</li>
			</ul>
		</div>
	);
}
