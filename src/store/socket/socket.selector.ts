import { RootState } from '~/store/store.ts';

export const socketSelector = {
	status: (state: RootState) => state.socket.status,
};
