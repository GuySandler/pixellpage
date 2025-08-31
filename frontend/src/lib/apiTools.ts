function fetchFromAPI(body: any, method: string, path: string, token?: string) {
	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
	};
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}
	return fetch(`http://localhost:3000${path}`, {
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined,
	});
}

function registerUser(username: string, gridPassword: string) {
	let response = fetchFromAPI({ username, password: gridPassword }, "POST", "/api/register");
	return response
		.then(res => res.json());
}

function loginUser(username: string, gridPassword: string) {
	let response = fetchFromAPI({ username, password: gridPassword }, "POST", "/api/login");
	return response
		.then(res => res.json());
}

function publishImg(base64img: string, token: string, by: string) {
	return fetchFromAPI({ image: base64img, by }, "POST", "/api/publish", token);
}

export { fetchFromAPI, registerUser, loginUser, publishImg };