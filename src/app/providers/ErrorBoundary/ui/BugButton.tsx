import { useEffect, useState } from 'react';

// News for testing ErrorBoundary
export const BugButton = () => {
	const [error, setError] = useState(false);

	const onThrow = () => setError(true);

	useEffect(() => {
		if (error) {
			throw new Error();
		}
	}, [error]);

	return <button onClick={onThrow}>throw error</button>;
};
