import React from "react";

const PacmanSpinner = () => {
	return (
		<div
			style={{
				margin: "auto",
				textAlign: "center",
				zIndex: "900",
				position: "relative",
				width: "100%",
				height: "100vh",
			}}
		>
			<div className="lds-css ng-scope">
				<div
					style={{
						position: "absolute",
						top: "30%",
						left: "50%",
						transform: "translate(-50%,-50%)",
						width: "100%",
						height: "100%",
						margin: "50px auto",
						textAlign: "center",
					}}
					class="lds-pacman"
				>
					<div>
						<div />
						<div />
						<div />
					</div>
					<div>
						<div />
						<div />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PacmanSpinner;
