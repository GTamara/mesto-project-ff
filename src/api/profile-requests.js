import { BASE_HTTP_HEADERS, BASE_SERVER_URL } from "./config";

export class ProfileRequests {

	getProfileData () {
		return fetch(
			`${BASE_SERVER_URL}users/me`,
			{
				headers: BASE_HTTP_HEADERS,
			}
		).then(res => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
		});
	}

	updateProfileData (payload) {
		return fetch(
			`${BASE_SERVER_URL}users/me`,
			{
				headers: {
					...BASE_HTTP_HEADERS,
					'Content-Type': 'application/json; charset=utf-8',
				},
				method: 'PATCH',
				body: JSON.stringify(payload),
			}
		).then(res => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
		});

	}
}
