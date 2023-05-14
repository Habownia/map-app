'use client';
import { uniqueArray } from '@/utils/dbActions';
import { useState } from 'react';

import styles from '../../sass/Test.module.scss';

export default function Test() {
	// tworzy unikalny array bazując na place_id
	const [uniquePlaces, setUniquePlaces] = useState<any>();
	(async () => {
		setUniquePlaces(await uniqueArray());
	})();
	// const uniquePlaces = await uniqueArray();

	const placesNames = uniquePlaces?.map((elem: any) => {
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
