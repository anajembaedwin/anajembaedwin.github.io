import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Work"
				body={
					<div className="works-body">
						<div className="work">
							<img
								src="./brief-case.jpg"
								alt="facebook"
								className="work-image"
							/>
							<div className="work-title">Propatidotnet</div>
							<div className="work-subtitle">
								Backend and DevOps Engineer
							</div>
							<div className="work-duration">2024 - Present</div>
						</div>

						<div className="work">
							<img
								src="./brief-case.jpg"
								alt="twitter"
								className="work-image"
							/>
							<div className="work-title">Algorinth Labs LLC</div>
							<div className="work-subtitle">
								Backend and Smart Contract Engineer
							</div>
							<div className="work-duration">2023 - 2024</div>
						</div>

						<div className="work">
							<img
								src="./brief-case.jpg"
								alt="facebook"
								className="work-image"
							/>
							<div className="work-title">Grandida LLC</div>
							<div className="work-subtitle">
								Backend and Smart Contract Engineer
							</div>
							<div className="work-duration">2022 - 2023</div>
						</div>

						<div className="work">
							<img
								src="./brief-case.jpg"
								alt="facebook"
								className="work-image"
							/>
							<div className="work-title">Palimart LLC</div>
							<div className="work-subtitle">
								Fullstack Developer - Contract
							</div>
							<div className="work-duration">2021 - 2022</div>
						</div>

						<div className="work">
							<img
								src="./brief-case.jpg"
								alt="facebook"
								className="work-image"
							/>
							<div className="work-title">UCPro LLC</div>
							<div className="work-subtitle">
								Junior Web Developer - Contract 
							</div>
							<div className="work-duration">2020 - 2021</div>
						</div>

						<div className="work">
							<img
								src="./brief-case.jpg"
								alt="facebook"
								className="work-image"
							/>
							<div className="work-title">STEM Teers NGO</div>
							<div className="work-subtitle">
								Junior Frontend Developer - Internship 
							</div>
							<div className="work-duration">2018 - 2020</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Works;
