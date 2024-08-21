import { debugMode } from '../shared/config/config.ts';

class Logger {
	debugMode = false;
	constructor(debugMode: boolean) {
		this.debugMode = debugMode;
	}

	shouldLog() {
		return this.debugMode;
	}
	log(...args: unknown[]) {
		if (!this.shouldLog()) return;

		console.log(...args);
	}
	error(...args: unknown[]) {
		if (!this.shouldLog()) return;

		console.error(...args);
	}
	warn(...args: unknown[]) {
		if (!this.shouldLog()) return;

		console.warn(...args);
	}
	table(...args: unknown[]) {
		if (!this.shouldLog()) return;

		console.table(...args);
	}
}

export const logger = new Logger(debugMode);
