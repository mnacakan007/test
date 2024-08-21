export function getDomain(): string {
	const hostName = window.location.host.replace(/www./, '');
	let domain = hostName;

	if (hostName != null) {
		const parts = hostName.split('.').reverse();

		if (parts != null && parts.length > 1) {
			domain = `${parts[1]}.${parts[0]}`;

			if (hostName.toLowerCase().indexOf('.co.uk') !== -1 && parts.length > 2) {
				domain = `${parts[2]}.${domain}`;
			}
		}
	}

	return domain;
}
