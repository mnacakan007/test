import React, { useEffect } from 'react';
import { Pagination, PaginationProps } from 'antd';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { scrollToTop } from '~/helpers/utils.ts';
import { useRootAppNavigate } from '~/hooks/useAppNavigate.ts';
import { OLD_API_URL } from '~/shared/config/config.ts';
import { useAppDispatch } from '~/store';
import newsActions from '~/store/news/actions.ts';
import { newsSelector } from '~/store/news/news.selector.ts';
import './Style.scss';


const Author: React.FC = () => {
	const author = useSelector(newsSelector.author);
	const navigate = useRootAppNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(newsActions.getCategoryNewsAction('2'));
		// eslint-disable-next-line
	}, []);

	if (!author) return;

	const { fullName, imageUrl, role, articles, description } = author;

	const goToInner = (event: React.MouseEvent<HTMLAnchorElement>, articleLink: string) => {
		event.preventDefault();
		navigate(articleLink);
	};

	const onChange: PaginationProps['onChange'] = (_page) => {
		scrollToTop('smooth');
	};

	return (
		<div className='author_block'>

			<img src={OLD_API_URL + '/' + imageUrl} alt={fullName} title={fullName} width='313px' height='313px'/>

			<div className="author_info">
				<div className="full_name">{fullName}</div>

				{role && <div className="role"><FormattedMessage id={role}/></div>}

				<span className='about_author'>{description}</span>

				{articles && (
					<>
						<span className='authors_articles_title'><FormattedMessage id="authors_articles"/></span>

						<div className='author_articles'>
							{articles.length > 0 && articles.map(article => (
								<a
									key={article.id}
									href={article.link}
									onClick={(event) => goToInner(event, article.link)}
									className="author_article"
								>
									<span className='article_title'>{article.title}</span>
								</a>
							))}

							{articles.length > 0 && (
								<div className='pagination'>
									<Pagination
										total={30}
										defaultPageSize={10}
										defaultCurrent={1}
										onChange={onChange}
									/>
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Author;