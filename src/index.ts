import './scss/styles.scss';

import { Api, ApiListResponse } from './components/base/Api';
import { ApiResponse, ICardItem, IOrderModel } from './types/index';
import { AppState } from './components/AppState';
import { cloneTemplate, ensureElement, createElement } from './utils/utils';
import { EventEmitter } from './components/base/Events';
import { API_URL } from './utils/constants';
import { Page } from './components/Page';
import { CardPreview, Card } from './components/Card';
import { Modal } from './components/Modal';
import { BasketView } from './components/BasketView';
import { CardBasketItem } from './components/CardBasketItem';
import { Order } from './components/Order';
import { Success } from './components/Success';

// TEMPLATES
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const events = new EventEmitter();

const api = new Api(API_URL);
const page = new Page(document.body, events);

const appData = new AppState({}, events);

console.log(appData.order.address);

const basket = new BasketView(cloneTemplate(basketTemplate), events);

const order = new Order('order', cloneTemplate(orderTemplate), events);
const contacts = new Order('order', cloneTemplate(contactsTemplate), events);
const success = new Success('order-success', cloneTemplate(successTemplate), {
	onClick: () => {
		events.emit('modal:close');
		modal.close();
	},
});

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// получаем товары
api
	.get('/product')
	.then((res: ApiResponse) => {
		appData.items = res.items as ICardItem[];
	})
	.catch((err) => console.log(err));

// EVENTS

// рендерим карточки
events.on('items:changed', () => {
	page.catalog = appData.items.map((item) => {
		const card = new Card('card', cloneTemplate(cardCatalogTemplate), {
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
events.on('card:select', (item: ICardItem) => {
	appData.setPreview(item);
});

// Показ карточки
events.on('preview:changed', (item: ICardItem) => {
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
			selected: item.selected,
		}),
	});
});

events.on('card:toBasket', (item: ICardItem) => {
	item.selected = true;
	appData.addToBasket(item);
	page.basketCounter = appData.basketTotalItems;
	modal.close();
});

events.on('basket:open', () => {

	const basketItems = renderBasketItems();

	modal.render({
		content: basket.render({
			items: basketItems,
			total: appData.basketTotalCost,
		}),
	});
});

events.on('basket:delete', (item: ICardItem) => {
	appData.deleteItemFromBasket(item.id);
	item.selected = false;
	page.basketCounter = appData.basketTotalItems;
	basket.total = appData.basketTotalCost;

	const basketItems = renderBasketItems();

	basket.items = basketItems;


	if (appData.basket.length <= 0) {
		basket.disableButton();
	}
});

events.on('order:open', () => {
	modal.render({
		content: order.render({
			address: appData.order.address,
			valid: false,
			errors: [],
		}),
	});
});

events.on('formErrorsOrder:change', (errors: Partial<IOrderModel>) => {
	const { payment, address } = errors;
	order.valid = !payment && !address;
	order.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});

events.on('formErrorsContacts:change', (errors: Partial<IOrderModel>) => {
	const { email, phone } = errors;
	contacts.valid = !email && !phone;
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

events.on(
	'orderInput:change',
	(data: { field: keyof IOrderModel; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

events.on('order:submit', () => {
	modal.render({
		content: contacts.render({
			phone: appData.order.phone,
			email: appData.order.email,
			valid: false,
			errors: [],
		}),
	});
});

events.on('contacts:submit', () => {
	api
		.post('/order', appData.makeOrder())
		.then((res) => {
			events.emit('order:success', res);
			appData.clearBasket();
			appData.refreshOrder();
			order.disableButtons();
			page.basketCounter = 0;
			appData.resetSelected();
		})
		.catch((err) => {
			console.log(err);
		});
});

events.on('order:success', (res: ApiListResponse<string>) => {
	modal.render({
		content: success.render({
			description: res.total,
		}),
	});
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	appData.refreshOrder();
	order.disableButtons();
	page.locked = false;
});



function renderBasketItems(): HTMLElement[] {
	const basketItems = appData.basket.map((item, idx) => {
		console.log(item);
		const basketItem = new CardBasketItem(
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

	return basketItems;
}