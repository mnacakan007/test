import { ICategory } from '~/store/news/types.ts';

export function checkCategoryColor(categoryId: string, categories: ICategory[]) {
	if (categories.length > 0) {
		const index = categories.findIndex((item) => item.id === categoryId);

		if (index > -1) {
			return categories[index].color;
		}
	}
}

export function getCategoryName(categoryId: string, categories: ICategory[]) {
	let categoryTranslateId = '';
	let categoryLink = '';

	if (categories && categories?.length > 0) {
		const category = categories.find(cat => cat.id === categoryId);
		if (category) {
			categoryTranslateId = category.title;
			categoryLink = category.link;
		}
	}

	return { categoryTranslateId, categoryLink };
}