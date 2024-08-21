export interface IYTVideNews {
	Player: new (playerId: string, data: {
		width  : number;
		height : number;
		videoId: string;
		events: {
			onReady      : () => void;
			onStateChange: (event: { data: number }) => void;
		};
	}) => any;  // Constructor signature
	PlayerState: YouTubePlayerStateType;
}

export interface IYouTubePlayer {
	playVideo    : () => void;
	pauseVideo   : () => void;
	[key: string]: any;
}

export interface IYouTubePlayerEvent {
	data: YouTubePlayerStateType;
}

export enum YouTubePlayerStateType {
	BUFFERING = 3,
  CUED = 5,
  ENDED = 0,
  PAUSED = 2,
  PLAYING = 1,
  UNSTARTED = -1,
}

export interface IInitializePlayer {
	(value: Element, key: number, parent: NodeListOf<Element>): void;
	(btn: Element, index: number): void;
}

export interface IPlayVideo {
	(player: IYouTubePlayer, btn: Element): void; (arg0: any, arg1: any): void;
}
