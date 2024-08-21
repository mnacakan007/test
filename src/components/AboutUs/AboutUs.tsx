import React from 'react';
import HeaderBlock from '~/components/CategoryHeader';
import AuthorItem from './components/AuthorItem.tsx';
import { AuthorsListProps } from '~/components/CategoryNews/types.ts';
import './Style.scss';

export const ABOUT_US_URL = 'authors';

const AboutUs: React.FC<AuthorsListProps> = ({ authors }) => {

	return (
		<>
			<HeaderBlock title='authors'/>

			<div className="about_us_description">
				<p>Tert.am–ը Հայաստանի առաջատար քաղաքական–վերլուծական հարթակներից է, որն օպերատիվ կերպով լուսաբանում է Հայաստանում,
					տարածաշրջանում և աշխարհում տեղի ունեցող կարևոր իրադարձությունները երեք լեզվով՝ հայերեն, ռուսերեն և անգլերեն։</p>
				<p>	Ներկայում Tert.am–ը Հայաստանի ամենաշատ այցելություններ, մեջբերումներ և հղումներ ունեցող կայքերից մեկն է, որը
					24/7 ձևաչափով օպերատիվ լրատվություն է տրամադրում ընթերցողին։ Կայքն ընթերցողին առաջարկում է լուրեր, ուղիղ
					հեռարձակումներ, հեղինակային նյութեր, հարցազրույցներ ինչպես հայ, այնպես էլ օտարերկրացի փորձագետների հետ։</p>
				<p>	Tert.am-ը հիմնադրվել է 2008 թ. «Մեդիա Սթայլ» ընկերության կողմից։ 2013 թ. Tert.am կայքը գնել է «Թերթ էյ էմ»
					ՍՊԸ–ն։ 2015-ին Tert.am-ը դարձել է PanArmenian Media Group–ի մաս։ 2019-ին կայքն ընդգրկվել է «Քառյակ մեդիա»
					ընկերության կազմում։</p>
				<p>Հիմնադրման պահից ի վեր Tert.am-ը դարձավ մեկն այն լրատվական կայքերից, որը Հայաստանում զարգացրեց մուլտիմեդիա
					ինտերնետային լրատվության ձևաչափը:</p>
				<p>
					Tert.am–ի առաքելությունն է օպերատիվ և անաչառ լրատվություն տրամադրել հանրությանը։ Tert.am–ի հրապարակումների
					շնորհիվ մեծ արձագանք են ստացել հասարակական նշանակության բազմաթիվ հարցեր, մի շարք խնդիրներ շուտափույթ լուծում են
					ստացել։ Այդ հրապարակումները նաև բարելավել են կարիքավոր անհատների սոցիալական պայմանները։</p>
			</div>

			<ul className="authors_list page_row">
				{authors?.length > 0 && authors.map((author) => (
					<li key={author.id} className='news_col'>
						<AuthorItem author={author}/>
					</li>
				))}
			</ul>
		</>
	);
};

export default AboutUs;