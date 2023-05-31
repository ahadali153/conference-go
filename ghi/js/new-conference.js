window.addEventListener("DOMContentLoaded", async () => {
	const locationURL = "http://localhost:8000/api/locations/";

	const response = await fetch(locationURL);
	if (response.ok) {
		const data = await response.json();
		console.log(data);
		const selectTag = document.getElementById("location");
		for (let location of data.locations) {
			const option = document.createElement("option");
			option.value = location.id;
			option.innerHTML = location.name;
			selectTag.appendChild(option);
		}
	}

	const formTag = document.getElementById("create-conference-form");
	formTag.addEventListener("submit", async (event) => {
		event.preventDefault();

		const formData = new FormData(formTag);
		const json = JSON.stringify(Object.fromEntries(formData));
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
		}
	});
});
