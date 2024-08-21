import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SocketStatus } from '~/helpers/commonConstants';
import { mapStringToSocketStatusEnum } from '~/helpers/utils';
import {
	ReconnectType,
	SetConnectionStatusType,
	SocketStateType,
} from '~/store/socket/types';

export const socketInitialState: SocketStateType = {
	status: SocketStatus.UNKNOWN,
};

const socketSlice = createSlice({
	name        : 'socket',
	initialState: socketInitialState,
	reducers    : {
		setConnectionStatus: (
			state: SocketStateType,
			{ payload }: PayloadAction<SetConnectionStatusType>
		) => {
			state.status = mapStringToSocketStatusEnum(payload.status);
		},
		reconnect: (
			state: SocketStateType,
			_action: PayloadAction<ReconnectType>
		) => state,
	},
});
export const { setConnectionStatus, reconnect } = socketSlice.actions;
export default socketSlice.reducer;
