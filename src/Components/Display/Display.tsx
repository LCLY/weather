import React from "react";
import "./Display.scss";
/* components */
import Spinner from "../Spinner/Spinner";
/* 3rd party lib */
/* Util */
import { ISearchResult } from "../../App";

interface DisplayProps {
	loading: boolean;
	searchResult: ISearchResult | null;
}

type Props = DisplayProps;

const Display: React.FC<Props> = ({ searchResult, loading }) => {
	return (
		<div className='display__outerdiv'>
			{loading ? (
				<div>
					<Spinner padding='81px' pixelSize={30} />
				</div>
			) : (
				<>
					<div className='display__label display__label--city'>
						{searchResult?.city}, {searchResult?.country}
					</div>
					<img
						className='display__image'
						alt='weather'
						width={"80px"}
						height='80px'
						src={`http://openweathermap.org/img/w/${searchResult?.icon}.png`}
					/>
					<div className='flex-align-center display__row'>
						<div className='display__label'>Description:</div>
						<div className='display__desc'>{searchResult?.description}</div>
					</div>
					<div className='flex-align-center display__row'>
						<div className='display__label'>Temperature: </div>
						{searchResult?.min_temp} °C ~ {searchResult?.max_temp} °C
					</div>
					<div className='flex-align-center display__row'>
						<div className='display__label'>Humidity: </div>
						{searchResult?.humidity}%
					</div>
					<div className='flex-align-center display__row'>
						<div className='display__label'>Time: </div>
						{searchResult?.time}
					</div>
				</>
			)}
		</div>
	);
};

export default Display;
