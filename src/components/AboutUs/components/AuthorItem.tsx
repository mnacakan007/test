import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useRootAppNavigate } from '~/hooks/useAppNavigate.ts';
import { OLD_API_URL } from '~/shared/config/config.ts';
import { useAppDispatch } from '~/store';
import { authorRefresh } from '~/store/news/slice.ts';
import { IAuthor } from '~/store/news/types.ts';
import '../Style.scss';

export interface AuthorItemProps {
	author: IAuthor;
}

const AuthorItem: React.FC<AuthorItemProps> = ({ author }) => {
	const { fullName, imageUrl, role, link } = author;
	const dispatch = useAppDispatch();
	const navigate = useRootAppNavigate();

	const goToInner = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		dispatch(authorRefresh(author));
		navigate(link);
	};

	return (
		<>
			<a
				href={link}
				onClick={goToInner}
				className="author_image">
				<img src={OLD_API_URL + '/' + imageUrl} alt={fullName} title={fullName} width='313px' height='313px' />
			</a>

			<div className="author_info">
				<div className="full_name">{fullName}</div>
				{role && <div className="role"><FormattedMessage id={role} /></div>}
			</div>
		</>
	);
};

export default AuthorItem;