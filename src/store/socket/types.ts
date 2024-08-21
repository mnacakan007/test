import { SocketStatus } from '~/helpers/commonConstants';

export type SocketStateType = {
  status: SocketStatus;
};

export interface SetConnectionStatusType {
  status: SocketStatus;
}

export interface ReconnectType {
  authToken: string | null;
}
