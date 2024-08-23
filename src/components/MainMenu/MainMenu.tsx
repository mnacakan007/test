import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ROUTE_PATH } from '~/app/providers/routes/utils.tsx';
import CreateSkeleton from '~/components/Skeleton';
import OutsideClickDetector from '~/helpers/OutsideClickDetector.tsx';
import { scrollToTop } from '~/helpers/utils.ts';
import { Website } from '~/shared/const/websiteUrls.enum.ts';
import { useAppDispatch } from '~/store';
import { newsSelector } from '~/store/news/news.selector.ts';
import useWindowSize from '~/hooks/useWindowSize';
import { paginationRefresh, uiRefresh } from '~/store/news/slice.ts';

import { ICategory } from '~/store/news/types.ts';
import { FormattedMessage } from 'react-intl';
import { settingsSelector } from '~/store/settings/settings.selector.ts';
import { setCurrentCategory } from '~/store/settings/slice.ts';
import { ELanguageCodes } from '~/translations/types.ts';
import './MainMenu.scss';

export const AUTHORS_URL = 'authors';


const MainMenu: React.FC= () => {
	const initialData = useSelector(newsSelector.initialData);
	const currentLanguage = useSelector(settingsSelector.currentLanguage);
	const currentCategoryId = useSelector(settingsSelector.currentCategoryId);
	const currentWebsite = useSelector(settingsSelector.currentWebsite);
	const { loading, showNewsFeed } = useSelector(newsSelector.UI);
	const [showMenu, setShowMenu] = useState(false);
	const [showFeedToggleButton, setShowFeedToggleButton] = useState(false);
	const [localLoading, setLocalLoading] = useState(false);
	const [currentWebsiteValue, setCurrentWebsiteValue] = useState<Website | null>(null);
	const showMenuRef = useRef<HTMLUListElement | null>(null);
	const params = useParams<{ category: string }>();
	const { category: categoryNameFromParams } = params;
	const categories = initialData && initialData.categories;
	const dispatch = useAppDispatch();
	const windowSize = useWindowSize();

	useEffect(() => {
		if (showMenuRef && showMenuRef.current) {
			const menuWidth = showMenuRef.current.offsetWidth;
			let usedWidth = 0;

			showMenuRef.current.querySelectorAll('span').forEach(item => {
				usedWidth += item.offsetWidth + 1;

				if (usedWidth > menuWidth) {
					item.closest('li')?.classList.add('terminal');
					return;
				} else if (item.closest('li')?.classList.contains('terminal')) {
					item.closest('li')?.classList.remove('terminal');
				}
			});
		}

		setCategoryCurrentClass();
		setShowFeedToggleButton(windowSize <= 768);

		// eslint-disable-next-line
	},[windowSize, initialData, categoryNameFromParams, categories, localLoading]);

	useEffect(() => {
		const isLoadingNewData = Boolean(!initialData || (initialData && loading && currentWebsite !== currentWebsiteValue));
		setLocalLoading(isLoadingNewData);
		setCurrentWebsiteValue(currentWebsite);
		// eslint-disable-next-line
	}, [currentWebsite, loading, initialData]);

	const setCategoryCurrentClass = () => {
		if (categoryNameFromParams && categories) {
			const index = categories.findIndex(category => category.link.includes(categoryNameFromParams));

			if (index > -1) {
				selectCategory(categories[index].id);
			} else {
				setCategory('');
			}
		} else {
			setCategory('');
		}
	};

	const toggleMenu = () => {
		if (windowSize <= 768 && !showMenu) {
			scrollToTop('smooth');
		}

		setShowMenu(!showMenu);

		if (showNewsFeed) {
			dispatch(uiRefresh({ showNewsFeed: false }));
		}
	};

	const toggleNewsFeedBlock = () => {
		if (windowSize <= 768 && !showNewsFeed) {
			scrollToTop('smooth');
		}

		dispatch(uiRefresh({ showNewsFeed: !showNewsFeed }));
	};

	const selectCategory = (categoryID: string) => {
		dispatch(paginationRefresh({ page: 1 }));
		hideMenu();
		setCategory(categoryID);
	};

	const hideMenu = () => {
		setShowMenu(false);
	};

	const setCategory = (categoryID: string) => {
		dispatch(setCurrentCategory(categoryID));
	};

	const Categories = (categories: ICategory[], inMenu?: boolean) => {
		return categories.filter(category => {
			const isRussianOrEnglish = currentLanguage?.code === ELanguageCodes.ru || currentLanguage?.code === ELanguageCodes.en;
			const isLifeOrMedicine = category.link === ROUTE_PATH.life || category.link === ROUTE_PATH.medicine;
			const isAboutUs = !inMenu && category.link === AUTHORS_URL;

			// Skip categories with specific links if the current language is Russian or English
			return !((isRussianOrEnglish && isLifeOrMedicine) || isAboutUs);
		}).map(category => (
			<li key={category.id}>
				<Link
					to={category.link}
					className={currentCategoryId === category.id ? 'current' : ''}
					onClick={() => selectCategory(category.id)}
				>
					{inMenu
						? <><span className="dot" style={{ backgroundColor: category.color }}/><FormattedMessage id={category.title} /></>
						: <span><FormattedMessage id={category.title} /></span>
					}
				</Link>
			</li>
		));
	};

	return (
		localLoading ? (
			<CreateSkeleton number={10} />
		) : (

			categories && categories.length > 0 && (
				<OutsideClickDetector className='header_inner' onOutsideClick={hideMenu}>
					<ul className="showed_menu" ref={showMenuRef}>{Categories(categories)}</ul>

					<div className={`main_menu ${showMenu ? 'opened' : ''}`}>
						<ul>{Categories(categories, true)}</ul>
					</div>

					{showFeedToggleButton && (
						<button type='button' className="feed_btn icon_news" aria-label="newsfeed" onClick={toggleNewsFeedBlock}>
							<FormattedMessage id="newsfeed"/>
						</button>
					)}

					<button type='button' className="burger_menu" aria-label="menu" onClick={toggleMenu}>
						<span/>
					</button>
				</OutsideClickDetector>
			)
		)
	);
};

export default MainMenu;