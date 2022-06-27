import React from "react";
import "./SearchHistory.scss";
/* components */
/* 3rd party lib */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTrashCan,
	faClipboard,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
/* Util */
import { ISearchHistory } from "../../App";

interface SearchHistoryProps {
	searchHistory: ISearchHistory[];
	setSearchHistory: React.Dispatch<React.SetStateAction<ISearchHistory[]>>;
	getWeatherData: (
		lat: number,
		lon: number,
		city: string,
		country: string,
		fromHistory: boolean
	) => void;
}

type Props = SearchHistoryProps;

const SearchHistory: React.FC<Props> = ({
	searchHistory,
	setSearchHistory,
	getWeatherData,
}) => {
	/* ================================================== */
	/*  state */
	/* ================================================== */
	/* ================================================== */
	/*  method */
	/* ================================================== */

	const handleRemoveItem = (id: string) => {
		let tempArray = [...searchHistory]; //make a copy of the array
		let resultArray = tempArray.filter(
			(child) => child.id.toString() !== id.toString()
		); //only leave the one that doesn't match the id provided
		setSearchHistory(resultArray); //update the state with the modified array
	};

	/* ================================================== */
	/*  useEffect */
	/* ================================================== */

	/* ================================================== */
	/* ================================================== */
	return (
		<>
			<div className='searchhistory__div'>
				<div className='searchhistory__div-top'>
					<h2>Search History</h2>
					{searchHistory.length > 0 && (
						<div>
							<button
								type='button'
								className='searchinput__button searchhistory__button-clear'
								onClick={() => setSearchHistory([])}
							>
								Clear All
							</button>
						</div>
					)}
				</div>
				<div className='searchhistory__content custom__scrollbar'>
					{searchHistory.length === 0 ? (
						<div className='searchhistory__norecord flex-align-center'>
							<FontAwesomeIcon
								className='searchhistory__norecord-icon'
								icon={faClipboard}
							/>{" "}
							No Record
						</div>
					) : (
						searchHistory.map((child, index) => (
							<div
								className='searchhistory__row flex-align-center'
								key={`history${index}`}
							>
								<div>
									{index + 1}. {child.city}, {child.country}
								</div>

								<div className='flex-align-center'>
									<div className='searchhistory__row-items--right'>
										{child.time}
									</div>
									<button
										className='searchhistory__row-items--right searchhistory__button searchhistory__button--search'
										onClick={() => {
											getWeatherData(
												child.lat,
												child.lon,
												child.city,
												child.country,
												true
											);
										}}
									>
										<FontAwesomeIcon icon={faMagnifyingGlass} />
									</button>
									<button
										className='searchhistory__row-items--right searchhistory__button searchhistory__button--delete'
										onClick={() => {
											handleRemoveItem(child.id);
										}}
									>
										<FontAwesomeIcon icon={faTrashCan} />
									</button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</>
	);
};

export default SearchHistory;
