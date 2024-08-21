import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useRouteError } from 'react-router';
import { logger } from '~/helpers/debugLogger.ts';

export const ErrorElement: React.FC<{ id?: string }> = ({ id }) => {
	const error = useRouteError();
	logger.table({
		id,
		error: error,
	});
	return (
		<div>
			<FormattedMessage id={'errorBoundary.occurred'} /> {id}
		</div>
	);
};
