import React, { useEffect, useState } from "react";
function PresentationForm() {
	const [conferences, setConference] = useState([]);

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
	const [formData, setFormData] = useState({
		presenter_name: "",
		presenter_email: "",
		company_name: "",
		title: "",
		synopsis: "",
		conference: "",
	});
	const handleFormDataChange = async (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = {};

		data.presenter_name = formData.presenter_name;
		data.presenter_email = formData.presenter_email;
		data.company_name = formData.company_name;
		data.title = formData.title;
		data.synopsis = formData.synopsis;
		data.conference = formData.conference;

		const locationUrl = `http://localhost:8000/api/conferences/${data.conference}/presentations/`;
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(locationUrl, fetchConfig);
		if (response.ok) {
			const newPresentation = await response.json();
			console.log(newPresentation);
			setFormData({
				presenter_name: "",
				presenter_email: "",
				company_name: "",
				title: "",
				synopsis: "",
				conference: "",
			});
		}
	};
	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a new presentation</h1>
					<form onSubmit={handleSubmit} id="create-presentation-form">
						<div className="form-floating mb-3">
							<input
								onChange={handleFormDataChange}
								placeholder="Presenter name"
								required
								type="text"
								name="presenter_name"
								id="presenter_name"
								className="form-control"
								value={formData.presenter_name}
							/>
							<label htmlFor="presenter_name">Presenter name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleFormDataChange}
								placeholder="Presenter email"
								required
								type="email"
								name="presenter_email"
								id="presenter_email"
								className="form-control"
								value={formData.presenter_email}
							/>
							<label htmlFor="presenter_email">Presenter email</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleFormDataChange}
								placeholder="Company name"
								type="text"
								name="company_name"
								id="company_name"
								className="form-control"
								value={formData.company_name}
							/>
							<label htmlFor="company_name">Company name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleFormDataChange}
								placeholder="Title"
								required
								type="text"
								name="title"
								id="title"
								className="form-control"
								value={formData.title}
							/>
							<label htmlFor="title">Title</label>
						</div>
						<div className="mb-3">
							<label htmlFor="synopsis">Synopsis</label>
							<textarea
								onChange={handleFormDataChange}
								className="form-control"
								id="synopsis"
								rows="3"
								name="synopsis"
								value={formData.synopsis}
							></textarea>
						</div>
						<div className="mb-3">
							<select
								onChange={handleFormDataChange}
								required
								name="conference"
								id="conference"
								className="form-select"
								value={formData.conference}
							>
								<option value="">Choose a conference</option>
								{conferences.map((conference) => {
									return (
										<option key={conference.id} value={conference.id}>
											{conference.name}
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

export default PresentationForm;
