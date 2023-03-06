import { uniqueArray } from '@/components/dbActions';

import styles from '../../sass/Test.module.scss';

export default async function Test() {
	// tworzy unikalny array bazując na place_id
	const uniquePlaces = await uniqueArray();

	const placesNames = uniquePlaces.map((elem) => {
		return (
			<div key={elem.id}>
				<p>{elem.dataDB.display_name}</p>
			</div>
		);
	});

	return (
		<div className={styles.main}>
			<h1>Zdjęcia</h1>
			<div>{placesNames}</div>
		</div>
	);
}
