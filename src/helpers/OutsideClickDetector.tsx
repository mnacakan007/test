import React, { useEffect, useRef } from 'react';
import { IOutsideClickDetectorProps } from './types';

const OutsideClickDetector: React.FC<IOutsideClickDetectorProps> = ({ onOutsideClick, children, className }) => {
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		/**
         * Handle clicks outside of the wrapper element.
         */
		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				onOutsideClick(event);
			}
		};

		/**
         * Add event listener when the component mounts.
         */
		document.addEventListener('mousedown', handleClickOutside);

		/**
         * Clean up the event listener when the component unmounts.
         */
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onOutsideClick]);

	return <div className={className} ref={wrapperRef}>{children}</div>;
};

export default OutsideClickDetector;
