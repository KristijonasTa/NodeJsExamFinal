const fetchGroups = async () => {
	try {
		const response = await fetch('http://localhost:8080/groups', {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		const responseJson = await response.json();
		return responseJson;
	} catch (err) {
		alert('Unexpected error!');
		localStorage.clear();
		location.replace('../login/login.html');
		console.log(err);
	}
};

const displayGroups = (data) => {
	const container = document.querySelector('.groups-container');
	let html = '';
	data.forEach((groups) => {
		html += `
        <div class="company">
            <h1>${groups.id}</h1>
            <p>${groups.name}<p/>
        </div>
        
        `;
	});
	container.innerHTML = html;
};
document.addEventListener('DOMContentLoaded', async () => {
	if (!localStorage.getItem('token')) location.replace('../login/login.html');
	const groups = await fetchGroups();
	displayGroups(groups);
});
