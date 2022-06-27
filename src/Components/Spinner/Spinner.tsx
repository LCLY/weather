import React from "react";
import "./Spinner.scss";

interface SpinnerProps {
	pixelSize?: number;
	padding?: string;
}

type Props = SpinnerProps;

const Spinner: React.FC<Props> = ({ pixelSize = 15, padding = "5px 0" }) => {
	return (
		<>
			<div className='spinner__loader-outerdiv' style={{ padding: padding }}>
				<div
					className='spinner__loader'
					style={{ width: `${pixelSize}px`, height: `${pixelSize}px` }}
				></div>
			</div>
		</>
	);
};

export default Spinner;
