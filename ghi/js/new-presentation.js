window.addEventListener("DOMContentLoaded", async () => {
	const url = "http://localhost:8000/api/conferences/";
	const response = await fetch(url);
	if (response.ok) {
		const data = await response.json();
		const selectTag = document.getElementById("conference");
		for (let conference of data.conferences) {
			const option = document.createElement("option");
			option.value = conference.href;
			option.innerHTML = conference.name;
			selectTag.appendChild(option);
		}
	}

	const formTag = document.getElementById("create-presentation-form");
	formTag.addEventListener("submit", async (event) => {
		event.preventDefault();

		const select = document.getElementById("conference");
		const conference_id = select.options[select.selectedIndex].value;

		const formData = new FormData(formTag);
		const json = JSON.stringify(Object.fromEntries(formData));
		console.log(json);
		const presentationUrl = `http://localhost:8000${conference_id}presentations/`;
		const fetchConfig = {
			method: "post",
			body: json,
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(presentationUrl, fetchConfig);
		if (response.ok) {
			formTag.reset();
		}
	});
});
