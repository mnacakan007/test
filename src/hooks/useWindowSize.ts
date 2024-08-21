import { useLayoutEffect, useState } from 'react';

const useWindowSize = () => {
	const [windowWidthSize, setWidthWindowSize] = useState(0);

	const handleSize = () => {
		setWidthWindowSize(window.innerWidth);
	};

	useLayoutEffect(() => {
		handleSize();

		window.addEventListener('resize', handleSize);

		return () => window.removeEventListener('resize', handleSize);
	}, []);

	return windowWidthSize;
};

export default useWindowSize;