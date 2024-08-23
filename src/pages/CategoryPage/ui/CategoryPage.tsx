import React, { useEffect, useState } from 'react';
import { Pagination, PaginationProps } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ROUTE_PATH } from '~/app/providers/routes/utils.tsx';
import AboutUs from '~/components/AboutUs';
import { ABOUT_US_URL } from '~/components/AboutUs/AboutUs.tsx';
import CategoryNews from '~/components/CategoryNews';
import Facebook from '~/components/Social/Facebook/Facebook.tsx';
import X from '~/components/Social/X/X.tsx';
import { VIDEO_URL } from '~/components/VideoNews/VideoNews.tsx';
import { CATEGORY_LIST_LOCATION } from '~/helpers/constants.ts';
import { scrollToTop } from '~/helpers/utils.ts';
import { useRootAppNavigate } from '~/hooks/useAppNavigate.ts';
import useWindowSize from '~/hooks/useWindowSize.ts';
import { useAppDispatch } from '~/store';
import newsActions from '~/store/news/actions.ts';
import { newsSelector } from '~/store/news/news.selector.ts';
import { paginationRefresh } from '~/store/news/slice.ts';
import { settingsSelector } from '~/store/settings/settings.selector.ts';
import './CategoryPage.scss';

const CategoryPage: React.FC = () => {
	const [showSocialBlock, setShowSocialBlock] = useState(false);
	const [categoryListLocation, setCategoryListLocation] = useState<CATEGORY_LIST_LOCATION>(CATEGORY_LIST_LOCATION.CATEGORY_PAGE);
	const categoryNews = useSelector(newsSelector.categoryNews);
	const videoNews = useSelector(newsSelector.videoNews);
	const authors = useSelector(newsSelector.authors);
	const currentCategoryId = useSelector(settingsSelector.currentCategoryId);
	const initialData = useSelector(newsSelector.initialData);
	const { loading} = useSelector(newsSelector.UI);
	const { page, limit } = useSelector(newsSelector.pagination);
	const categories = initialData && initialData.categories;
	const dispatch = useAppDispatch();
	const windowSize = useWindowSize();
	const params = useParams<{ category: string }>();
	const { category } = params;

	const newsList = categoryNews ?? videoNews;
	const authorListExists = Boolean(authors?.length);
	const newsListExists = Boolean(newsList?.length);
	const authorListEmpty = Array.isArray(authors) && authors.length === 0;
	const newsListEmpty = Array.isArray(newsList) && newsList.length === 0;

	// const { locale } = useParams<{ locale: string }>();
	// const { pathname } = useLocation();
	const navigate = useRootAppNavigate();

	// const goToInner = () => {
	// 	if (pathname.startsWith(`/${locale}/${ROUTE_PATH.medicine}`)) {
	// 		navigate('medicine/news/2024/07/04/children/94414');
	// 	} else if (pathname.startsWith(`/${locale}/${ROUTE_PATH.life}`)) {
	// 		navigate('life/news/2024/07/04/children/94414');
	// 	} else {
	// 		navigate('news/2024/07/04/children/94414');
	// 	}
	// };

	const onChange: PaginationProps['onChange'] = (page) => {
		scrollToTop('smooth');
		setPage(page);
		getCategoryNews(currentCategoryId);
	};

	const getCategoryNews = (categoryId: string) => {
		dispatch(newsActions.getCategoryNewsAction(categoryId));
	};

	const getVideoNews = () => {
		dispatch(newsActions.getVideoNewsAction());
	};

	const setPage = (page: number) => {
		dispatch(paginationRefresh({ page }));
	};

	useEffect(() => {
		scrollToTop('instant');
	}, []);

	useEffect(() => {
		setShowSocialBlock(windowSize < 576);
	},[windowSize]);

	useEffect(() => {
		if (category === VIDEO_URL) {
			setCategoryListLocation(CATEGORY_LIST_LOCATION.VIDEO_PAGE);

			if (!videoNews) getVideoNews();

			return;
		}

		if (categories) {
			const currentCategory = categories?.find(c => c.title === category);

			if (!currentCategory) {
				navigate(ROUTE_PATH.errorPage);
				return;
			}

			if (currentCategory && ((categoryNews && categoryNews[0].categoryId !== currentCategoryId) || !categoryNews)) {
				const categoryId = currentCategoryId || currentCategory.id;
				setCategoryListLocation(CATEGORY_LIST_LOCATION.CATEGORY_PAGE);
				getCategoryNews(categoryId);
			}
		}

		return () => {
			setPage(1);
		};
		// eslint-disable-next-line
	}, [category, categories]);

	// Todo: Change this div to skeleton component
	if (loading && (!newsList || !authors)) {
		return <div className='page_container'>Loading</div>;
	}

	if (!newsList && !authors) return null;

	if (newsListEmpty && authorListEmpty) {
		return <div>No news available</div>;
	}

	return (
		<div className='page_container'>
			<div className="category_page_block">
				{/*<Button onClick={goToInner}>Go Category inner</Button>*/}

				{newsList && category !== ABOUT_US_URL
					? <CategoryNews newsList={newsList} categoryListLocation={categoryListLocation} />
					: authors && authorListExists && <AboutUs authors={authors} />
				}

				{(newsListExists && category !== ABOUT_US_URL) && (
					<div className='pagination'>
						<Pagination
							total={48}
							defaultPageSize={limit}
							defaultCurrent={page}
							onChange={onChange}
						/>
					</div>
				)}

				{showSocialBlock && (
					<div className="social_block">
						<div className='page_container'>
							<div className='social_inner'>
								<Facebook width={'287'}/>
								<X/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CategoryPage;
