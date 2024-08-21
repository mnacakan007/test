import React from 'react';
import { useSelector } from 'react-redux';
import CreateSkeleton from '~/components/Skeleton';
import { newsSelector } from '~/store/news/news.selector.ts';
import { settingsSelector } from '~/store/settings/settings.selector.ts';
import { useAppDispatch } from '~/store';
import { storeLocale } from '~/helpers/localStorageUtils.ts';
import { replaceLang } from '~/store/settings/utils.ts';
import { setDocumentDirection } from '~/translations/utils.ts';
import { ILanguage } from '~/store/settings/types.ts';
import { setLanguage } from '~/store/settings/slice.ts';
import { router } from '../../app/providers/routes/browserRoutes';
import './LangSwitcher.scss';

const LangSwitcher: React.FC = () => {
	const initialData = useSelector(newsSelector.initialData);
	const languages = useSelector(settingsSelector.languages);
	const currentLanguage = useSelector(settingsSelector.currentLanguage);
	const dispatch = useAppDispatch();

	const handleLangSelect = (langID: number) => {
		const language = languages.find((elem: ILanguage) => {
			return elem.id === langID;
		});

		if (language) {
			dispatch(setLanguage(language));
			storeLocale(language);
			setDocumentDirection(language);
			const replacedPath: string = replaceLang(language.code);
			router.navigate(replacedPath);
		}
	};

	return (
		<div className="lg_block">
			{!initialData ? (
				<CreateSkeleton number={2} />
			) : (
				<div className='lg_list'>
					{
						languages.map((item, idx) => {
							if (currentLanguage?.id === item.id) {
								return false;
							}

							return (
								<button
									key={`language-${idx}`}
									aria-label={item.name}
									onClick={() => handleLangSelect(item.id)}
									value={item.id}
								>
									{item.name}
								</button>
							);
						})
					}
				</div>
			)}
		</div>
		
	);
};

export default LangSwitcher;
