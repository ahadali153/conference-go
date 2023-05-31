import React, { useEffect, useState } from "react";
function ConferenceForm() {
	const [locations, setLocations] = useState([]);

	const [name, setName] = useState("");
	const handleNameChange = (event) => {
		const value = event.target.value;
		setName(value);
	};

	const [starts, setStartTime] = useState("");
	const handleStartTimeChange = (event) => {
		const value = event.target.value;
		setStartTime(value);
	};

	const [ends, setEndTime] = useState("");
	const handleEndTimeChange = (event) => {
		const value = event.target.value;
		setEndTime(value);
	};

	const [description, setDescription] = useState("");
	const handleDescriptionChange = (event) => {
		const value = event.target.value;
		setDescription(value);
	};

	const [maxPresentations, setMaxPresentations] = useState("");
	const handleMaxPresentationsChange = (event) => {
		const value = event.target.value;
		setMaxPresentations(value);
	};

	const [maxAttendees, setMaxAttendees] = useState("");
	const handleMaxAttendeesChange = (event) => {
		const value = event.target.value;
		setMaxAttendees(value);
	};

	const [location, setLocation] = useState("");
	const handleLocationChange = (event) => {
		const value = event.target.value;
		setLocation(value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = {};

		data.name = name;
		data.starts = starts;
		data.ends = ends;
		data.description = description;
		data.max_presentations = maxPresentations;
		data.max_attendees = maxAttendees;
		data.location = location;

		console.log(data);

		const conferenceUrl = "http://localhost:8000/api/conferences/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(conferenceUrl, fetchConfig);
		if (response.ok) {
			const newConference = await response.json();
			console.log(newConference);
			setName("");
			setStartTime("");
			setEndTime("");
			setDescription("");
			setMaxPresentations("");
			setMaxAttendees("");
			setLocation("");
		}
	};

	const fetchData = async () => {
		const locationURL = "http://localhost:8000/api/locations/";

		const response = await fetch(locationURL);
		if (response.ok) {
			const data = await response.json();
			setLocations(data.locations);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a new conference</h1>
					<form onSubmit={handleSubmit} id="create-conference-form">
						<div className="form-floating mb-3">
							<input
								onChange={handleNameChange}
								placeholder="Name"
								required
								type="text"
								name="name"
								id="name"
								className="form-control"
								value={name}
							/>
							<label htmlFor="name">Name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleStartTimeChange}
								placeholder="starts"
								required
								type="date"
								name="starts"
								id="starts"
								className="form-control"
								value={starts}
							/>
							<label htmlFor="starts">Starts</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleEndTimeChange}
								placeholder="ends"
								required
								type="date"
								name="ends"
								id="ends"
								className="form-control"
								value={ends}
							/>
							<label htmlFor="ends">Ends</label>
						</div>
						<div className="mb-3">
							<label htmlFor="description">Description</label>
							<textarea
								placeholder="enter description"
								className="form-control"
								id="description"
								rows="3"
								onChange={handleDescriptionChange}
								value={description}
							></textarea>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleMaxPresentationsChange}
								placeholder="max_presentations"
								required
								type="number"
								name="max_presentations"
								id="max_presentations"
								className="form-control"
								value={maxPresentations}
							/>
							<label htmlFor="max_presentations">Max Presentations</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleMaxAttendeesChange}
								placeholder="max_attendees"
								required
								type="number"
								name="max_attendees"
								id="max_attendees"
								className="form-control"
								value={maxAttendees}
							/>
							<label htmlFor="max_attendees">Max Attendees</label>
						</div>
						<div className="mb-3">
							<select
								onChange={handleLocationChange}
								required
								name="location"
								id="location"
								className="form-select"
								value={location}
							>
								<option value="">Location</option>
								{locations.map((location) => {
									return (
										<option key={location.id} value={location.id}>
											{location.name}
										</option>
									);
								})}
							</select>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ConferenceForm;
