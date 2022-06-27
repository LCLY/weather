import React from "react";
import "./SearchInput.scss";
/* components */
/* 3rd party lib */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

/* Util */
import { ISearchInput } from "../../App";

interface SearchInputProps {
	searchInput: ISearchInput;
	setSearchInput: React.Dispatch<React.SetStateAction<ISearchInput>>;
	handleSubmit: (e: React.SyntheticEvent) => any;
}

type Props = SearchInputProps;

const SearchInput: React.FC<Props> = ({
	searchInput,
	setSearchInput,
	handleSubmit,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className='searchinput__div'>
				<div className='searchinput__innerdiv-left flex-align-center'>
					{["City", "Country"].map((child, index) => (
						<div className='searchinput__div-group' key={`search${index}`}>
							<label htmlFor={child} className='searchinput__label'>
								{child}:
							</label>
							<input
								id={child}
								className='searchinput__input'
								value={(searchInput as any)[child.toLowerCase()]}
								onChange={(e) => {
									// target the object key and update respective values
									setSearchInput({
										...searchInput,
										[child.toLowerCase()]: e.target.value,
									});
								}}
							/>
						</div>
					))}
				</div>

				<div className='searchinput__innerdiv-left flex-align-center'>
					{/* ========================= Desktop buttons ========================= */}
					<button
						className='searchinput__button searchinput__button-submit searchinput__button--desktop'
						type='submit'
						disabled={
							searchInput.city.trim() === "" &&
							searchInput.country.trim() === ""
						} //disabled it if both are empty
					>
						Search
					</button>
					<button
						type='button'
						className='searchinput__button searchinput__button-clear searchinput__button--desktop'
						onClick={() => setSearchInput({ city: "", country: "" })}
					>
						Clear
					</button>

					{/* ========================= Mobile buttons ========================= */}

					<button
						className='searchinput__button searchinput__button-submit searchinput__button--mobile'
						type='submit'
						disabled={
							searchInput.city.trim() === "" &&
							searchInput.country.trim() === ""
						} //disabled it if both are empty
					>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</button>
					<button
						type='button'
						className='searchinput__button searchinput__button-clear searchinput__button--mobile'
						onClick={() => setSearchInput({ city: "", country: "" })}
					>
						<FontAwesomeIcon icon={faXmark} />
					</button>
				</div>
			</div>
		</form>
	);
};

export default SearchInput;
