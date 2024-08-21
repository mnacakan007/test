import React from 'react';
import { Helmet } from 'react-helmet-async';
import { X_IFRAME_WIDGET_API_URL } from '~/shared/config/config.ts';
import '../Style.scss';

const X: React.FC = () => {
	return (
		<>
			<Helmet>
				<script id="YOUTUBE_IFRAME_ID" defer src={X_IFRAME_WIDGET_API_URL}/>
			</Helmet>

			<a className="twitter-timeline" href="https://twitter.com/TERTam_arm?ref_src=twsrc%5Etfw">Tweets by TERTam_arm</a>
		</>
	);
};

export default X;