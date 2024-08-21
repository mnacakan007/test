import { cloneDeep, keys } from 'lodash';
import { SocketStatus } from '~/helpers/commonConstants';

export function fill(
	source: { [x: string]: any },
	target: any,
	withCreatingKeys = false
) {
	const sourceKeys = keys(source);
	const targetKeys = keys(target);
	const result = cloneDeep(target);
	sourceKeys.forEach((key) => {
		if (!targetKeys.includes(key) && !withCreatingKeys) {
			return;
		}
		result[key] = source[key];
	});

	return result;
}

export function mapStringToSocketStatusEnum(socketStatusString: SocketStatus) {
	switch (socketStatusString) {
		case 'Connected':
			return SocketStatus.CONNECTED;
		case 'Disconnected':
			return SocketStatus.DISCONNECTED;
		default:
			return SocketStatus.DISCONNECTED;
	}
}

export const delay = (ms: number | undefined) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export function scrollToTop(behavior: ScrollBehavior) {
	window.scrollTo({
		top: 0,
		behavior,
	});
}

export const reloadPage = () => {
	location.reload();
};

export function replicateArray<T>(array: T[], n: number): T[] {
	// Use the `Array.from` method to create an array with `n` copies of `array`
	return Array.from({ length: n }, () => [...array]).flat();
}

