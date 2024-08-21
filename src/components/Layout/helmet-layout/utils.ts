import { cloneDeep } from 'lodash';
import { ISEO, ISettings } from '~/store/settings/types.ts';
import { pageTitle } from '~/shared/config/config.ts';

function setValue(val: string | null, title: string | null = pageTitle) {
	const websiteTitle = title || pageTitle;
	if (!val) return websiteTitle;

	return `${val} : ${websiteTitle}`;
}

function changeValue(val: string | null, changedValue: string | null) {
	return val ? val : changedValue || '';
}

export function seoValue(seoWebsite: Partial<ISettings>, seoPage: ISEO) {
	const seo = cloneDeep(seoPage);

	seo.seoTitle = changeValue(seoPage.seoTitle, seoPage.pageName ?? '');
	seo.seoTitle = setValue(seo.seoTitle, seoWebsite.seo_title ?? '');
	seo.seoDescription = changeValue(seo.seoDescription, seoWebsite.seo_description ?? '');
	seo.seoKeywords = changeValue(seo.seoKeywords, seoWebsite.seo_keywords ?? '');
	seo.ogTitle = changeValue(seo.ogTitle, seoWebsite.og_title ?? '');
	seo.ogDescription = changeValue(seo.ogDescription, seoWebsite.og_description ?? '');
	seo.ogImageURL = changeValue(seo.ogImageURL, seoWebsite.og_image ?? '');

	return seo;
}
