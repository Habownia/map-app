'use client';
import { useEffect, useState } from 'react';

import WeatherChart from '@/components/chart';

import { dbPlace } from '@/types/mapTypes';

type weather = {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;
	hourly_units: {
		time: string;
		temperature_2m: string;
	};
	hourly: {
		time: string[];
		temperature_2m: number[];
	};
};

async function getData(id: any) {
	const res = await fetch(
		`http://${process.env.NEXT_PUBLIC_HOST}/api/collections/places/records?page=1&perPage=1&filter=dataDB.place_id=${id}`,
		{ cache: 'no-store' }
	);
	const data = await res.json();
	return data.items[0];
}

async function getWeather(lat: string, lon: string) {
	const res = await fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`
	);
	return await res.json();
}

export default function PlacesId({ params }: any) {
	// Zaokrąla liczbę do 4 miejsca po przecinku
	const toFourth = (data: string) => parseFloat(data).toFixed(4);

	const [place, setPlace] = useState<dbPlace>();
	const [weather, setWeather] = useState<weather>();

	useEffect(() => {
		(async () => setPlace(await getData(params.id)))();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (place) {
			(async () => {
				const lat = toFourth(place.dataDB.lat);
				const lon = toFourth(place.dataDB.lon);
				setWeather(await getWeather(lat, lon));
			})();
		}
	}, [place]);

	const placeName = place ? place.dataDB.display_name.split(', ')[0] : '';

	if (weather) {
		console.log(weather);
	}

	// TODO ostylowanie
	return (
		<div>
			<p>{placeName}</p>
			{weather && <WeatherChart weather={weather} placeName={placeName} />}
		</div>
	);
}
