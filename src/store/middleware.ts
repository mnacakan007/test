import { HttpStatusCode } from 'axios';
import { AxiosError } from 'axios';
// import store from "~/store/index";

// const getDispatch = () => {
//   return store.dispatch;
// };

// ------   handle errors   ------

export const handleError = (error: AxiosError): void => {
	if (!error.response) return;

	const user = localStorage.getItem('user');
	// const dispatch = getDispatch();

	if (error.response.status === HttpStatusCode.Unauthorized && user) {
		return;
	}
};
