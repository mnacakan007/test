import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { INewsProps } from '~/components/News/types.ts';
import { checkCategoryColor } from '~/helpers/category.ts';
import { CATEGORY_LIST_LOCATION } from '~/helpers/constants.ts';
import { useRootAppNavigate } from '~/hooks/useAppNavigate.ts';
import { OLD_API_URL } from '~/shared/config/config.ts';
import { useAppDispatch } from '~/store';
import { newsSelector } from '~/store/news/news.selector.ts';
import { uiRefresh } from '~/store/news/slice.ts';
import './Style.scss';

const News: React.FC<INewsProps> = ({
	news,
	width,
	height,
	index,
	categoryListLocation,
}) => {
	const categories = useSelector(newsSelector.initialData)?.categories || [];
	const { selectedVideoNewsId } = useSelector(newsSelector.UI);
	const {
		id,
		date,
		link = '',
		title,
		imageUrl,
		categoryId = '',
		description,
		categoryLink = '',
		categoryName = '',
	} = news;

	const dispatch = useAppDispatch();
	const navigate = useRootAppNavigate();

	const selectNews = () => {
		if (categoryListLocation === CATEGORY_LIST_LOCATION.VIDEO_PAGE && id !== -1) {
			dispatch(uiRefresh({ selectedVideoNewsId: id }));
		}
	};

	const goToInner = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		navigate(link);
	};

	return (
		<div className={`news_block ${selectedVideoNewsId === id ? 'selected' : ''}`} onClick={selectNews}>
			{categoryListLocation !== CATEGORY_LIST_LOCATION.VIDEO_PAGE ? (
				imageUrl && (categoryListLocation !== CATEGORY_LIST_LOCATION.HOME_PAGE || (categoryListLocation === CATEGORY_LIST_LOCATION.HOME_PAGE && index === 0)) && (
					<a
						href={link}
						onClick={goToInner}
						className="news_image">
						<img src={OLD_API_URL + '/' + imageUrl} alt={title} title={title} width={width} height={height}/>
					</a>
				)
			) : (
				<div className="news_image">
					{imageUrl && <img src={OLD_API_URL + '/' + imageUrl} alt={title} title={title} width={width} height={height}/>}
				</div>
			)}

			<div className="news_info">
				{categoryListLocation !== CATEGORY_LIST_LOCATION.CATEGORY_PAGE && categoryName && (
					<Link
						to={categoryLink}
						className="news_category"
						style={{ color: checkCategoryColor(categoryId, categories) }}
					>
						{<FormattedMessage id={categoryName} />}
					</Link>
				)}

				{date && <div className="news_date">{date.replace(' ', ' • ')}</div>}

				{title && (
					<>
						{categoryListLocation !== CATEGORY_LIST_LOCATION.VIDEO_PAGE ? (
							<a href={link} className="news_title" onClick={goToInner}>{title}</a>
						) : (
							<div className="news_title">{title}</div>
						)}
					</>
				)}

				{categoryListLocation !== CATEGORY_LIST_LOCATION.HOME_PAGE && description && (
					<div className='news_description'>{description}</div>
				)}
			</div>
		</div>
	);
};

export default News;