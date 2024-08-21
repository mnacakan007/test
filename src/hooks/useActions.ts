import { bindActionCreators } from 'redux';
import { useAppDispatch } from '~/store';

export const useActions = () => {
	const dispatch = useAppDispatch();

	return bindActionCreators({}, dispatch);
};
