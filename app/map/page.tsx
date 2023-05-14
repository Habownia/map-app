'use client';
import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

import Link from 'next/link';
import { uniqueArray, apiAdd } from '@/utils/dbActions';
import { TbSearch } from 'react-icons/tb';
import { DUMMY_PLACES_ARRAY, DUMMY_PLACE } from '@/utils/dummy';

// żeby się nie rozwaliła mapa
import 'leaflet/dist/leaflet.css';
import style from '../../sass/MapPage.module.scss';
import mapLoaderStyle from '../../sass/MapLoader.module.scss';

import { place } from '../../types/mapTypes';

async function getCoords(place: string) {
	const preparedPlace = place.toLowerCase().replaceAll(' ', '+');
	try {
		const res = await fetch(
			`https://nominatim.openstreetmap.org/search?q=${preparedPlace}&format=json&polygon=1&addressdetails=1`
		);
		const data = await res.json();
		return data[0];
	} catch {
		return false;
	}
}

export default function Map() {
	// dynamicznie importuje mapę z useMemo żeby nie mrugało
	const MapLeaflet = useMemo(
		() =>
			dynamic(() => import('../../components/map'), {
				loading: () => (
					<div
						className={`${mapLoaderStyle.loader} ${mapLoaderStyle.map_container}`}
					>
						<p>Loading</p>
					</div>
				),

				ssr: false, // zapobiega SSR
			}),
		[]
	);
	// Zapisywanie wartości z inputa
	const [place, setPlace] = useState<place>();

	function handleChange(e: any) {
		setInputPlace(e.target.value);
	}

	// Submit
	const [inputPlace, setInputPlace] = useState('');
	const [placesArray, setPlacesArray] = useState<any>([]);

	// ustawia przy pierwszym renderze jako placesArray elementy z db
	useEffect(() => {
		(async () => {
			const places = await uniqueArray();
			let placesExtracted = places.map((elem) => elem.dataDB);
			setPlacesArray(placesExtracted);
		})();
	}, []);

	async function handleSubmit(e: any) {
		await e.preventDefault();
		setPlace(await getCoords(inputPlace));
		// setPlace(DUMMY_PLACE);
	}

	// Przy każdej zmianie miejsca update'uje tablice
	useEffect(() => {
		setPlacesArray((prevPlacesArray: any) => {
			if (place && prevPlacesArray) {
				// filtruje tablice i sprawdza czy takie id występuje, a potem łączy tablice
				const uniqueArray = prevPlacesArray.filter(
					(elem: place) => elem.place_id !== place.place_id
				);
				if (uniqueArray.length <= 0) {
					return [place];
				}
				return [...uniqueArray, place];
			} else if (place) {
				return [place];
			} else {
				return prevPlacesArray;
			}
		});
		// setPlacesArray(DUMMY_PLACES_ARRAY);

		// przy każdym dodaniu miejsca updatuje db
		(async () => await apiAdd(place))();
	}, [place]);

	if (placesArray) {
		var placesParagraph = placesArray.map((elem: place) => {
			// sprawdza czy obiekt nie jest pusty
			if (elem.display_name) {
				const placeName = elem.display_name.split(', ');
				return (
					<Link
						href={`/map/${elem.place_id}`}
						key={elem.place_id}
						className={style.place}
					>
						<span>{placeName[0]}</span>, {placeName[1]}
					</Link>
				);
			}
		});
	}

	// TODO możliwość dodania miejscowości przez mapę
	return (
		<div className={style.main}>
			<MapLeaflet placesArray={placesArray} />
			<div className={style.form_cont}>
				<form onSubmit={handleSubmit}>
					<div className={style.search}>
						<input
							type='text'
							value={inputPlace || ''}
							onChange={handleChange}
							placeholder='Wyszukaj miejscowość'
						/>
						<button type='submit' className={style.submit}>
							<TbSearch className={style.glass} />
							{/* <p className={style.tooltip}>Search</p> */}
						</button>
					</div>
				</form>
				<div className={style.results}>{placesParagraph}</div>
			</div>
		</div>
	);
}
