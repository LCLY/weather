import React, { useState } from "react";
import "./App.scss";
import SearchInput from "./Components/SearchInput/SearchInput";
import axios from "axios";
import Display from "./Components/Display/Display";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import SearchHistory from "./Components/SearchHistory/SearchHistory";

export interface ISearchInput {
	city: string;
	country: string;
}
export interface ISearchResult {
	city: string;
	country: string;
	icon: string;
	description: string;
	min_temp: string;
	max_temp: string;
	humidity: string;
	time: string;
}
export interface ISearchHistory {
	id: string;
	city: string;
	country: string;
	lat: number;
	lon: number;
	time: string;
}

function App() {
	/* ================================================== */
	/*  state */
	/* ================================================== */

	const [searchInput, setSearchInput] = useState<ISearchInput>({
		city: "",
		country: "",
	});

	const [noData, setNoData] = useState(false);
	const [loading, setLoading] = useState(false);
	const [searchResult, setSearchResult] = useState<ISearchResult | null>(null);
	const [searchHistory, setSearchHistory] = useState<ISearchHistory[]>([]);
	/* ================================================== */
	/*  method */
	/* ================================================== */

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		// when submit successful, call geolocation api to get the latitude and longitude based on the country and city first
		axios
			.get(
				`http://api.openweathermap.org/geo/1.0/direct?q=${searchInput.city},${searchInput.country}&limit=1&appid=${process.env.REACT_APP_KEY}`
			)
			.then((res) => {
				if (res.data.length === 0) {
					// if array return 0 length, then show the not found message
					setNoData(true);
					setTimeout(() => {
						setNoData(false); // change it back to false after 2 seconds to hide it
					}, 2000);
				} else {
					// get index 0 since we limiting it to only 1 result
					let resultObj = res.data[0];
					setSearchInput({ city: "", country: "" });
					// spread obj out to retain the other values

					let city = resultObj.name;
					let country = resultObj.country;
					// call another API to get more details using the longtitude and latitude
					getWeatherData(resultObj.lat, resultObj.lon, city, country, false);

					// everytime a successful call is made, stack the history array
					setSearchHistory([
						...searchHistory,
						{
							id: uuidv4(),
							city: city,
							country: country,
							lat: resultObj.lat,
							lon: resultObj.lon,
							time: moment().format("HH:mm:ss A"), //current time
						},
					]);
				}
			})
			.catch((err) => console.log(err));
	};

	const getWeatherData = (
		lat: number,
		lon: number,
		city: string,
		country: string,
		fromHistory: boolean
	) => {
		setLoading(true);
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_KEY}`
			)
			.then((res) => {
				setLoading(false);
				let resultObj = res.data;

				console.log(resultObj);
				setSearchResult({
					city: city,
					country: country,
					icon: resultObj.weather[0].icon,
					description: resultObj.weather[0].description,
					min_temp: resultObj.main.temp_min,
					max_temp: resultObj.main.temp_max,
					humidity: resultObj.main.humidity,
					time: moment()
						.utcOffset(resultObj.timezone / 60)
						.format("YYYY-MM-DD HH:mm A"),
				}); //timezone is in seconds so need to convert to minutes

				// if the method is coming from searchHistory, then stack onto the history array
				if (fromHistory) {
					setSearchHistory([
						...searchHistory,
						{
							id: uuidv4(),
							city: city,
							country: country,
							lat: lat,
							lon: lon,
							time: moment().format("HH:mm:ss A"), //current time
						},
					]);
				}
			})
			.catch((err) => console.log(err));
	};

	/* ================================================== */
	/*  useEffect */
	/* ================================================== */

	/* ================================================== */
	/* ================================================== */

	return (
		<div className='App custom__scrollbar'>
			<div className='weather__body'>
				<h1 className='weather__header'>Today's Weather</h1>
				<SearchInput
					handleSubmit={handleSubmit}
					searchInput={searchInput}
					setSearchInput={setSearchInput}
				/>
				{noData && <div className='weather__notfound'>No Result Found</div>}

				{searchResult && (
					<Display loading={loading} searchResult={searchResult} />
				)}
				<SearchHistory
					searchHistory={searchHistory}
					setSearchHistory={setSearchHistory}
					getWeatherData={getWeatherData}
				/>
			</div>
		</div>
	);
}

export default App;
