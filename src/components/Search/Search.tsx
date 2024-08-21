import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import CreateSkeleton from '~/components/Skeleton';
import useWindowSize from '~/hooks/useWindowSize.ts';
import { useAppDispatch } from '~/store';
import { newsSelector } from '~/store/news/news.selector.ts';
import OutsideClickDetector from '~/helpers/OutsideClickDetector';
import { uiRefresh } from '~/store/news/slice.ts';
import './Search.scss';

const Search: React.FC = () => {
	const initialData = useSelector(newsSelector.initialData);
	const { showNewsFeed } = useSelector(newsSelector.UI);
	const [showSearchToggleButton, setShowSearchToggleButton] = useState(false);
	const [searchToggle, setSearchToggle] = useState(false);
	const searchInputRef = useRef<HTMLInputElement | null>(null);
	const windowSize = useWindowSize();
	const dispatch = useAppDispatch();

	useEffect(() => {
		setShowSearchToggleButton(windowSize <= 1024);
	}, [windowSize]);

	const handleFocus = () => {
		setSearchToggle(true);

		if (searchInputRef.current) {
			searchInputRef.current.focus();
		}

		if (showNewsFeed) {
			dispatch(uiRefresh({ showNewsFeed: false }));
		}
	};

	return (
		<OutsideClickDetector 
			onOutsideClick={() => setSearchToggle(false)} 
			className={`search_block ${searchToggle ? 'opened' : ''}`}
		>
			{!initialData ? (
				<CreateSkeleton number={1} />
			) : (
				<div className="search_inner">
					<div className="search_field">
						<input type="text" name="search" maxLength={200} placeholder="Search" ref={searchInputRef}/>
					</div>
					{
						!showSearchToggleButton ? (
							<button
								type="submit"
								aria-label="search"
								className="search_btn icon_search" 
							/>
						) : (
							<button
								type="button"
								aria-label="search"
								className="search_btn icon_search"
								onClick={handleFocus}
							/>
						)
					}

				</div>
			)}
		</OutsideClickDetector>
	);
};

export default Search;