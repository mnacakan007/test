import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import VideoPlayerModal from '~/components/Modals/VideoPlayer';
import { settingsSelector } from '~/store/settings/settings.selector.ts';
import { newsSelector } from '~/store/news/news.selector.ts';
import CategoryNewsList from '~/components/CategoryNews/components/CategoryNewsList.tsx';
import CategoryVideoNewsList from '~/components/CategoryNews/components/CategoryVideoNewsList.tsx';
import YearPicker from '~/components/YearPicker';
import { checkCategoryColor, getCategoryName } from '~/helpers/category.ts';
import { CategoryNewsProps } from '~/components/CategoryNews/types.ts';
import { CATEGORY_LIST_LOCATION } from '~/helpers/constants.ts';
import './Style.scss';

const CategoryNews: React.FC<CategoryNewsProps> = ({
	newsList,
	categoryId,
	categoryListLocation,
}) => {
	const initialData = useSelector(newsSelector.initialData);
	const currentCategoryId = useSelector(settingsSelector.currentCategoryId);
	const categoryID = categoryId || currentCategoryId;
	const categories = initialData && initialData.categories || [];
	const categoryColor = checkCategoryColor(categoryID, categories);
	const { categoryLink, categoryTranslateId } = getCategoryName(categoryID, categories);

	return (
		<div
			className={`category_news_block news_col ${categoryListLocation === CATEGORY_LIST_LOCATION.CATEGORY_PAGE ? 'category_page' : ''}`}>
			<span className='top_border' style={{ color: categoryColor }}/>
			{categoryTranslateId && (
				<h2 className="section_title">
					{categoryListLocation === CATEGORY_LIST_LOCATION.HOME_PAGE ? (
						<Link to={categoryLink}><FormattedMessage id={categoryTranslateId}/></Link>
					) : (
						<FormattedMessage id={categoryTranslateId}/>
					)}
				</h2>
			)}

			{categoryListLocation === CATEGORY_LIST_LOCATION.CATEGORY_PAGE && (
				<YearPicker disabled={false} date={new Date()} id="news" onChangeDate={() => {
				}}/>
			)}

			{categoryListLocation !== CATEGORY_LIST_LOCATION.VIDEO_PAGE
				? <CategoryNewsList categoryListLocation={categoryListLocation} newsList={newsList}/>
				: <CategoryVideoNewsList newsList={newsList} />
			}

			<VideoPlayerModal />
		</div>
	);
};

export default CategoryNews;