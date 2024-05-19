import './scss/styles.scss';

import { Api } from './components/base/api';
import { ApiResponse, ICardItem } from './types/index';
import { AppState } from './components/AppState';
import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { API_URL } from './utils/constants';
import { Page } from './components/Page';
import { Card, CardPreview, CatalogItem } from './components/Card';
import { CardItem } from './components/CardItem';
import { Modal } from './components/Modal';

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

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// get products data
api
	.get('/product')
	.then((res: ApiResponse) => {
		console.log(res.items);
		appData.items = res.items as ICardItem[];
	})
	.catch((err) => console.log(err));

// EVENTS

// render catalog view
events.on('items:changed', () => {
	page.catalog = appData.items.map((item) => {
		const card = new CatalogItem(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});

		return card.render({
			category: item.category,
			title: item.title,
			description: item.description,
			image: item.image,
			price: item.price,
		});
	});
});

// card select
events.on('card:select', (item: CardItem) => {
	appData.setPreview(item);
});

// card show
events.on('preview:changed', (item: CardItem) => {
	const card = new CardPreview(cloneTemplate(cardPreviewTemplate));
	modal.render({
		content: card.render({
			description: item.description,
			title: item.title,
			image: item.image,
			price: item.price,
		}),
	});
});


events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});
