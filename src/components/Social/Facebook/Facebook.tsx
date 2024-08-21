import React from 'react';
import '../Style.scss';

const Facebook: React.FC<{ width?: string }> = ({ width}) => {
	return (
		<div className='facebook_iframe'>
			<iframe
				title="facebookFram"
				src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FTERTam.arm%2F%3Fref%3Dembed_page&tabs&${width || '269'}&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
				width={width || '269'} height="130" style={{ border: 'none', overflow: 'hidden' }}
				allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"/>
		</div>
	);
};

export default Facebook;