import './scss/styles.scss';

import { Api } from './components/base/api';
import { ApiResponse } from './types/index';
import { AppState } from './components/AppState';
import {cloneTemplate, ensureElement} from './utils/utils';
import {EventEmitter} from './components/base/events';
import { API_URL } from './utils/constants';
import {Page} from './components/Page';
import {Card, CatalogItem} from './components/Card';

// TEMPLATES
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBacketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const backetTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const events = new EventEmitter();

const api = new Api(API_URL);
const page = new Page(document.body, events);

const appData = new AppState({}, events);

api.get('/product').then((res: ApiResponse) => {
	// catalogModel.items = res.items;
});

console.log(catalogModel.items);


events.on('items:changed', () => {
	page.catalog = catalogModel.items.map(item => {
		const card = new CatalogItem(cloneTemplate(cardCatalogTemplate));

		return card.render({
			id: item.id,
			title: item.title,
			category: item.category,
			image: item.image,
			description: item.description,
			price: item.price,
		})
	})
})
