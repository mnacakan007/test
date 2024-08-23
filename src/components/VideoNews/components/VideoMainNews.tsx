import React, { useEffect, useRef, useState } from 'react';
import { Helmet, HelmetTags, StateUpdate } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { VideoMainNewsProps } from '~/components/CategoryNews/types.ts';
import CurrentVideoItem from './CurrentVideoItem.tsx';
import {
	IYTVideNews,
	IYouTubePlayer,
	IYouTubePlayerEvent,
	YouTubePlayerStateType,
} from '~/components/VideoNews/type.ts';
import { YOUTUBE_IFRAME_API_URL } from '~/shared/config/config.ts';
import { newsSelector } from '~/store/news/news.selector.ts';
import { INews, IVideoNews } from '~/store/news/types.ts';
import { uiRefresh } from '~/store/news/slice.ts';
import { useAppDispatch } from '~/store';
import '../Style.scss';

const VideoMainNews: React.FC<VideoMainNewsProps> = ({ newsList, fromModalPage }) => {
	const [scriptLoaded, setScriptLoaded] = useState(false);
	const [selectedNews, setSelectedNews] = useState<IVideoNews | INews | null>();
	const videoBtnRef = useRef<HTMLButtonElement | null>(null);
	const player = useRef<IYouTubePlayer | null>(null);
	const currentlyPlaying = useRef<IYouTubePlayer | null>(null);
	const { selectedVideoNewsId, autoPlayVideo } = useSelector(newsSelector.UI);
	const initialData = useSelector(newsSelector.initialData);
	const videoNews = newsList || initialData && initialData.videoNews;
	const { YT } = (window as Window & typeof globalThis & { YT: IYTVideNews });
	let foundIntegrationLoaderScript: HTMLScriptElement | undefined;
	const dispatch = useAppDispatch();

	const handleChangeClientState = (_newState: StateUpdate, addedTags: HelmetTags) => {
		if (addedTags && addedTags.scriptTags) {
			foundIntegrationLoaderScript =
				addedTags.scriptTags.find(({ src }) => src === YOUTUBE_IFRAME_API_URL);

			if (foundIntegrationLoaderScript) {
				foundIntegrationLoaderScript.addEventListener('load', () => setScriptLoaded(true), { once: true });
			}
		}
	};

	const playVideo = (player: IYouTubePlayer, btn: Element) => {
		if (typeof player.playVideo === 'function') {
			pausePlayer();

			player.loadVideoById((selectedNews as IVideoNews)!.videoId);
			currentlyPlaying.current = player;
			player.playVideo();

			btn.classList.remove('loading');
			btn.classList.add('playing');
		} else {
			setTimeout(() => playVideo(player, btn), 500);
		}
	};

	const onPlayerReady = () => {};

	const onPlayerStateChange = (event: IYouTubePlayerEvent) => {
		if (event.data === YouTubePlayerStateType.ENDED) {
			currentlyPlaying.current = null;
			document.querySelector('.playing')?.classList.remove('playing');
		}
	};

	const pausePlayer = () => {
		if (currentlyPlaying.current) {
			currentlyPlaying.current.pauseVideo();
			document.querySelector('.playing')?.classList.remove('playing');
		}
	};

	const addPlayers = () => {
		if (scriptLoaded && !player.current && (selectedNews as IVideoNews)?.videoId) {
			player.current = new YT.Player('video_player_iframe', {
				width  : 750,
				height : 550,
				videoId: (selectedNews as IVideoNews).videoId,
				events : {
					onReady      : onPlayerReady,
					onStateChange: onPlayerStateChange,
				},
			});
		}

		if (videoBtnRef && videoBtnRef.current && player.current) {
			videoBtnRef.current.classList.add('loading');
			playVideo(player.current, videoBtnRef.current);
		}
	};

	const findAndSelectVideoNews = () => {
		const news = videoNews!.find(news => news.id === selectedVideoNewsId) as IVideoNews;

		if (news) {
			pausePlayer();
			setSelectedNews(news);
		}
	};

	useEffect(() => {
		if (!scriptLoaded) return;

		if (videoNews && videoNews?.length > 0) {
			if (!fromModalPage) {
				const firstItemID = videoNews[0]?.id;

				if (selectedVideoNewsId) {
					findAndSelectVideoNews();
				} else if (firstItemID) {
					dispatch(uiRefresh({ selectedVideoNewsId: firstItemID }));
				}
			} else if (selectedVideoNewsId) {
				findAndSelectVideoNews();
			}
		}
		// eslint-disable-next-line
	}, [selectedVideoNewsId, videoNews, scriptLoaded]);

	useEffect(() => {
		if (selectedNews && autoPlayVideo && scriptLoaded) {
			addPlayers();
		}
		// eslint-disable-next-line
	}, [selectedNews]);

	return (
		<>
			<Helmet onChangeClientState={handleChangeClientState}>
				<script id="YOUTUBE_IFRAME_ID" defer src={YOUTUBE_IFRAME_API_URL}/>
			</Helmet>

			<div className="current_video">
				{selectedNews && <CurrentVideoItem news={selectedNews} btnClick={addPlayers} videoBtnRef={videoBtnRef}/>}

				<div id="video_player_iframe" className="video_player"/>
			</div>
		</>
	);
};

export default VideoMainNews;