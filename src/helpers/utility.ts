export function getRawToken(): string | null {
	return localStorage.getItem('token') || sessionStorage.getItem('token');
}

export function setToken(token: string): void {
	return localStorage.setItem('token', token);
}

export function clearToken(): void {
	localStorage.removeItem('token');
	sessionStorage.removeItem('token');
}

export function clearUser(): void {
	localStorage.removeItem('user');
	sessionStorage.removeItem('user');
}

export function getToken(): string | null {
	try {
		return localStorage.getItem('token') || sessionStorage.getItem('token');
	} catch (err) {
		clearToken();

		return null;
	}
}
export function getUser() {
	try {
		const rawUser: string | null =
      localStorage.getItem('user') || sessionStorage.getItem('user');

		if (!rawUser) return null;

		return JSON.parse(rawUser);
	} catch (error) {
		clearUser();

		return null;
	}
}

// export function setUser(data: IUserSettings): void {
// 	localStorage.setItem('user', JSON.stringify(data));
// }

export function getAudioNotification() {
	try {
		const rawUser: string | null =
      localStorage.getItem('user') || sessionStorage.getItem('user');

		if (!rawUser) return null;

		const user = JSON.parse(rawUser);

		return user.audio;
	} catch (error) {
		clearUser();

		return null;
	}
}
