'use client';
import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

import { uniqueArray, apiAdd } from '@/components/dbActions';
import { TbSearch } from 'react-icons/tb';
import { MapLoader } from '@/components/mapComponents';

// żeby się nie rozwaliła mapa
import 'leaflet/dist/leaflet.css';
import style from '../../sass/Map.module.scss';

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
				loading: () => <MapLoader />,
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

		{
			// setPlace({
			// 	place_id: 246420989,
			// 	licence:
			// 		'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
			// 	osm_type: 'way',
			// 	osm_id: 702913690,
			// 	boundingbox: ['49.7323576', '49.7324997', '20.6864255', '20.6866443'],
			// 	lat: '49.73242865',
			// 	lon: '20.686534899999998',
			// 	display_name:
			// 		'16, Znamirowice, gmina Łososina Dolna, powiat nowosądecki, województwo małopolskie, 33-312, Polska',
			// 	class: 'building',
			// 	type: 'yes',
			// 	importance: 0.21000999999999997,
			// 	address: {
			// 		house_number: '16',
			// 		village: 'Znamirowice',
			// 		municipality: 'gmina Łososina Dolna',
			// 		county: 'powiat nowosądecki',
			// 		state: 'województwo małopolskie',
			// 		'ISO3166-2-lvl4': 'PL-12',
			// 		postcode: '33-312',
			// 		country: 'Polska',
			// 		country_code: 'pl',
			// 	},
			// });
		}
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

		{
			// setPlacesArray([
			// 	{
			// 		place_id: 308965113,
			// 		licence:
			// 			'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
			// 		osm_type: 'relation',
			// 		osm_id: 6091708,
			// 		boundingbox: ['49.719964', '49.7529', '20.6648305', '20.7215888'],
			// 		lat: '49.7318564',
			// 		lon: '20.6788594',
			// 		display_name:
			// 			'Znamirowice, gmina Łososina Dolna, powiat nowosądecki, województwo małopolskie, Polska',
			// 		class: 'boundary',
			// 		type: 'administrative',
			// 		importance: 0.3644313097683034,
			// 		icon: 'https://nominatim.openstreetmap.org/ui/mapicons/poi_boundary_administrative.p.20.png',
			// 		address: {
			// 			village: 'Znamirowice',
			// 			municipality: 'gmina Łososina Dolna',
			// 			county: 'powiat nowosądecki',
			// 			state: 'województwo małopolskie',
			// 			'ISO3166-2-lvl4': 'PL-12',
			// 			country: 'Polska',
			// 			country_code: 'pl',
			// 		},
			// 	},
			// 	{
			// 		place_id: 308499148,
			// 		licence:
			// 			'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
			// 		osm_type: 'relation',
			// 		osm_id: 6092085,
			// 		boundingbox: ['49.7349146', '49.7638138', '20.6704736', '20.7060652'],
			// 		lat: '49.7431362',
			// 		lon: '20.6873342',
			// 		display_name:
			// 			'Tabaszowa, gmina Łososina Dolna, powiat nowosądecki, województwo małopolskie, Polska',
			// 		class: 'boundary',
			// 		type: 'administrative',
			// 		importance: 0.3660971516994237,
			// 		icon: 'https://nominatim.openstreetmap.org/ui/mapicons/poi_boundary_administrative.p.20.png',
			// 		address: {
			// 			village: 'Tabaszowa',
			// 			municipality: 'gmina Łososina Dolna',
			// 			county: 'powiat nowosądecki',
			// 			state: 'województwo małopolskie',
			// 			'ISO3166-2-lvl4': 'PL-12',
			// 			country: 'Polska',
			// 			country_code: 'pl',
			// 		},
			// 	},
			// 	{
			// 		place_id: 308084287,
			// 		licence:
			// 			'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
			// 		osm_type: 'relation',
			// 		osm_id: 2904794,
			// 		boundingbox: ['49.5549437', '49.6655553', '20.6484062', '20.7648749'],
			// 		lat: '49.61030395',
			// 		lon: '20.714936589668028',
			// 		display_name: 'Nowy Sącz, województwo małopolskie, Polska',
			// 		class: 'boundary',
			// 		type: 'administrative',
			// 		importance: 0.7314336040798202,
			// 		icon: 'https://nominatim.openstreetmap.org/ui/mapicons/poi_boundary_administrative.p.20.png',
			// 		address: {
			// 			administrative: 'Nowy Sącz',
			// 			city: 'Nowy Sącz',
			// 			state: 'województwo małopolskie',
			// 			'ISO3166-2-lvl4': 'PL-12',
			// 			country: 'Polska',
			// 			country_code: 'pl',
			// 		},
			// 	},
			// ]);
		}

		// przy każdym dodaniu miejsca updatuje db
		(async () => await apiAdd(place))();
	}, [place]);

	if (placesArray) {
		var placesParagraph = placesArray.map((elem: place) => {
			const placeName = elem.display_name.split(', ');
			return (
				<p key={elem.place_id}>
					<span>{placeName[0]}</span>, {placeName[1]}
				</p>
			);
		});
	}

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
