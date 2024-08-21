import isPlainObject from 'lodash/isPlainObject';
import io from 'socket.io-client';
import { SOCKET_URL } from '~/shared/config/config.ts';

import { getRawToken } from '../utility';

const socket = () => createSocket();

export function createSocket() {
  const storeData = getStoreData();

  const socket = io(SOCKET_URL, {
    transports: ['websocket'],
    auth: {
      token: storeData.token,
    },
  });

  socket.on('reconnect_attempt', () => {
    const storeData = getStoreData();
    socket.io.opts.auth = {
      token: storeData.token,
    };
  });

  return socket;
}

export function createEvent(eventType, payload = {}) {
  return {
    type: eventType,
    body: {
      ...payload,
    },
  };
}

export function emitEvent(event, data) {
  return new Promise((resolve, reject) => {
    try {
      socket().emit(event, data, (res) => {
        resolve(res);
      });
    } catch (err) {
      reject(err);
    }
  });
}

export function emitEventMessage(event, data) {
  try {
    socket().emit(event, data);
    return Promise.resolve({ status: 'OK' });
  } catch (err) {
    return Promise.reject(err);
  }
}

export function createError(socketResponse) {
  let errorMessage = null;

  if (!isPlainObject(socketResponse)) {
    errorMessage = `Socket response is not an object: ${socketResponse}`;
  }

  if (socketResponse.body) {
    errorMessage = `Socket response error: ${socketResponse.body}`;
    if (socketResponse.error) {
      errorMessage += ` ${String(socketResponse.error)}`;
    }
  }

  if (socketResponse.data) {
    errorMessage = `Socket response error: ${socketResponse.data}`;
  }

  if (errorMessage) {
    const error = new Error(errorMessage);
    error.response = {
      data: {
        text: errorMessage,
      },
    };

    return error;
  }

  return new Error(JSON.stringify(socketResponse));
}

export function closeSocketPromise(socket) {
  return new Promise((resolve, reject) => {
    try {
      socket.close();
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
}

export function connectSocketPromise(socket) {
  return new Promise((resolve, reject) => {
    try {
      socket.connect();
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
}

function getStoreData() {
  return {
    token: getRawToken(),
  };
}

export default socket;
