import './scss/styles.scss';

import { Api } from './components/base/api';
import { ApiResponse, ICardItem } from './types/index';
import { AppState } from './components/AppState';
import { cloneTemplate, ensureElement, createElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { API_URL } from './utils/constants';
import { Page } from './components/Page';
import { Card, CardPreview, CatalogItem } from './components/Card';
import { CardItem } from './components/CardItem';
import { Modal } from './components/Modal';
import { Basket } from './components/Basket';
import { BasketItem } from './components/BasketItem';

// TEMPLATES
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const events = new EventEmitter();

const api = new Api(API_URL);
const page = new Page(document.body, events);

const appData = new AppState({}, events);

const basket = new Basket(cloneTemplate(basketTemplate), events);

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

// Событие на выбор карточки
events.on('card:select', (item: CardItem) => {
	appData.setPreview(item);
});

// Показ карточки
events.on('preview:changed', (item: CardItem) => {
	const card = new CardPreview(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			events.emit('card:toBasket', item);
		},
	});
	modal.render({
		content: card.render({
			category: item.category,
			description: item.description,
			title: item.title,
			image: item.image,
			price: item.price,
		}),
	});
});

events.on('card:toBasket', (item: CardItem) => {
	appData.addToBasket(item);
	page.basketCounter = appData.basketTotalItems;
	modal.close();
});

events.on('basket:open', () => {
	const basketItems = appData.basket.map((item, idx) => {
		const basketItem = new BasketItem(
			'card',
			cloneTemplate(cardBasketTemplate),
			{
				onClick: () => {
					events.emit('basket:delete', item);
				},
			}
		);

		return basketItem.render({
			price: item.price,
			title: item.title,
			description: item.description,
			index: idx + 1,
		});
	});
	modal.render({
		content: basket.render({
			items: basketItems,
			total: appData.basketTotalCost,
		}),
	});
});

events.on('basket:delete', (item: CardItem) => {
	appData.deleteItemFromBasket(item.id);
	page.basketCounter = appData.basketTotalItems;
	basket.price = appData.basketTotalCost;
	basket.refreshIndices();
	if (appData.basket.length <= 0) {
		basket.disableButton();
	}
})

// блокировка страницы при открытии модального окна
events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});
