import React from 'react';
import { FormattedMessage } from 'react-intl';
import MainLogo from '~/components/Logo';
import './FooterPage.scss';


const FooterPage: React.FC = () => {
	return (
		<div className="footer">
			<div className="page_container">
				<div className="page_row">
					<div className="footer_left">
						<MainLogo/>
						<div className="developer">
							<FormattedMessage id="footer.developed"/>
							<a href="https://www.studio-one.am" target="_blank" rel="noreferrer">
								<img src="/src/assets/images/StudioOne.svg" alt='StudioOne.svg' title='StudioOne.svg' width={116} height={15}/>
								Studio One
							</a>
						</div>
					</div>
					<div className="footer_main">
						<div className="company_name"><FormattedMessage id="footer.address.title"/></div>
						<ul className="company_contacts">
							<li>
								<FormattedMessage id="footer.address"
									values={{
										br: <br />,
									}}
								/>
							</li>
							<li>
								<FormattedMessage id="footer.address.phone"/>
								<a href="tel:+37441768838">+374 41 768838</a>
							</li>
							<li>
								<FormattedMessage id="footer.address.email"/> 
								<a href="mailto:editor@tert.am">editor@tert.am</a>
							</li>
							<li>
								<FormattedMessage id="footer.call_for_advertising"/> 
								<br/><a href="tel:+37444030320">044 030320</a>
							</li>
						</ul>
						<div className="use_terms">
							<FormattedMessage id="footer.terms_of_use"/> 
							<a href="#">
								<FormattedMessage id="footer.here"/>
							</a>
						</div>

					</div>
					<div className="footer_right">
						<div className="copyrights"><FormattedMessage id="footer.copyright_title"/></div>
						<div className="rules"><FormattedMessage id="footer.copyright_info"/></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FooterPage;
