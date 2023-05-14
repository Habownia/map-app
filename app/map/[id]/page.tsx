'use client';
import { useEffect, useState } from 'react';

import WeatherChart from '@/components/chart';

import { dbPlace } from '@/types/mapTypes';
import { weather } from '@/types/chartTypes';
import style from '@/sass/Place.module.scss';
import useWeatherHours from '@/hooks/useWeatherHours';

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
		`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m&forecast_days=16`
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

	const { weatherHours, currentTime } = useWeatherHours(weather, 24);

	if (weather) {
		console.log(weather);
	}

	const weatherData = weatherHours.map((elem: any, index: number) => {
		const temperature = weather!.hourly.temperature_2m[index + currentTime];
		return (
			<div key={index}>
				<p>{temperature}</p>
				<p>{weatherHours[index]}</p>
			</div>
		);
	});
	console.log(weatherData);

	// TODO ostylowanie
	return (
		<main className={style.main}>
			<h1 className={style.header}>{placeName}</h1>
			<div className={style.weatherScrollBar}>{weatherData}</div>
			{/* {weather && <WeatherChart weather={weather} placeName={placeName} />} */}
		</main>
	);
}
