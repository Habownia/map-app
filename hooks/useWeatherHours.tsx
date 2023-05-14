import { useEffect, useState } from 'react';

export default function useWeatherHours(weather: any, hours: any) {
	const [currentTime, setCurrentTime] = useState<number>(0);
	useEffect(() => {
		setCurrentTime(new Date().getHours() as number);
	}, []);

	if (weather) {
		const forecastHours = hours + currentTime;
		const weatherHours = [];

		// console.log(weather);

		for (
			let i = currentTime;
			i < weather.hourly.time.length && i <= forecastHours;
			i++
		) {
			weatherHours.push(weather.hourly.time[i].split('T')[1]);
		}
		return { weatherHours, currentTime };
	}
	return { weatherHours: [], currentTime: 0 };
}
