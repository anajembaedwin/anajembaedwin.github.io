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
								alt="Netzence Sustainability Limited"
								className="work-image"
							/>
							<div>
								<div className="work-title">Netzence Sustainability Limited</div>
								<div className="work-subtitle">
									Full Stack Web Developer (E-Commerce, Payment Integration, Web3)
								</div>
							</div>
							<div className="work-duration">Jun 2024 - Present</div>
						</div>

						<div className="work">
							<img
								src="./brief-case.jpg"
								alt="Algorinth Labs LLC"
								className="work-image"
							/>
							<div>
								<div className="work-title">Algorinth Labs LLC</div>
								<div className="work-subtitle">
									Full Stack Developer
								</div>
							</div>
							<div className="work-duration">Jul 2023 - Jun 2024</div>
						</div>

						<div className="work">
							<img
								src="./brief-case.jpg"
								alt="Grandida LLC"
								className="work-image"
							/>
							<div>
								<div className="work-title">Grandida LLC</div>
								<div className="work-subtitle">
									Full Stack Developer
								</div>
							</div>
							<div className="work-duration">Jul 2021 - Jun 2023</div>
						</div>

						<div className="work">
							<img
								src="./brief-case.jpg"
								alt="Palimart LLC"
								className="work-image"
							/>
							<div>
								<div className="work-title">Palimart LLC</div>
								<div className="work-subtitle">
									Full Stack Developer (Frontend Heavy)
								</div>
							</div>
							<div className="work-duration">Apr 2020 - May 2021</div>
						</div>

						<div className="work">
							<img
								src="./brief-case.jpg"
								alt="Prince Ebeano & Co."
								className="work-image"
							/>
							<div>
								<div className="work-title">Prince Ebeano & Co.</div>
								<div className="work-subtitle">
									Inventory Analyst
								</div>
							</div>
							<div className="work-duration">Mar 2018 - Apr 2020</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Works;
