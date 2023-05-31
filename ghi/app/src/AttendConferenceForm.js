import React, { useEffect, useState } from "react";

function AttendConferenceForm() {
	const [conferences, setConference] = useState([]);

	const [formData, setFormData] = useState({
		conference: "",
		name: "",
		email: "",
	});

	const handleFormDataChange = async (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = {};

		data.name = formData.name;
		data.conference = formData.conference;
		data.email = formData.email;

		console.log(data);

		const attendeeUrl = "http://localhost:8001/api/attendees/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(attendeeUrl, fetchConfig);
		if (response.ok) {
			const newAttendConference = await response.json();
			console.log(newAttendConference);
			// setFormData({
			// 	name: "",
			// 	email: "",
			// 	conference: "",
			// });
			const FormTag = document.getElementById("create-attendee-form");
			FormTag.classList.add("d-none");
			const DivSuccessTag = document.getElementById("success-message");
			DivSuccessTag.classList.remove("d-none");
		}
	};

	let spinnerClasses = "d-flex justify-content-center mb-3";
	let dropdownClasses = "form-select d-none";
	if (conferences.length > 0) {
		spinnerClasses = "d-flex justify-content-center mb-3 d-none";
		dropdownClasses = "form-select";
	}

	const fetchData = async () => {
		const url = "http://localhost:8000/api/conferences/";
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setConference(data.conferences);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="my-5">
			<div className="row">
				<div className="col col-sm-auto">
					<img
						width="300"
						className="bg-white rounded shadow d-block mx-auto mb-4"
						src="/logo.svg"
					/>
				</div>
				<div className="col">
					<div className="card shadow">
						<div className="card-body">
							<form onSubmit={handleSubmit} id="create-attendee-form">
								<h1 className="card-title">It's Conference Time!</h1>
								<p className="mb-3">
									Please choose which conference you'd like to attend.
								</p>
								<div className={spinnerClasses} id="loading-conference-spinner">
									<div className="spinner-grow text-secondary" role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
								</div>
								<div className="mb-3">
									<select
										onChange={handleFormDataChange}
										name="conference"
										id="conference"
										className={dropdownClasses}
										required
										value={formData.conference}
									>
										<option value="">Choose a conference</option>
										{conferences.map((conference) => {
											return (
												<option key={conference.id} value={conference.href}>
													{conference.name}
												</option>
											);
										})}
									</select>
								</div>
								<p className="mb-3">Now, tell us about yourself.</p>
								<div className="row">
									<div className="col">
										<div className="form-floating mb-3">
											<input
												onChange={handleFormDataChange}
												required
												placeholder="Your full name"
												type="text"
												id="name"
												name="name"
												className="form-control"
												value={formData.name}
											/>
											<label htmlFor="name">Your full name</label>
										</div>
									</div>
									<div className="col">
										<div className="form-floating mb-3">
											<input
												onChange={handleFormDataChange}
												required
												placeholder="Your email address"
												type="email"
												id="email"
												name="email"
												className="form-control"
												value={formData.email}
											/>
											<label htmlFor="email">Your email address</label>
										</div>
									</div>
								</div>
								<button className="btn btn-lg btn-primary">I'm going!</button>
							</form>
							<div
								className="alert alert-success d-none mb-0"
								id="success-message"
							>
								Congratulations! You're all signed up!
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AttendConferenceForm;
