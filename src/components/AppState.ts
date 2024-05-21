import {
	FormErrors,
	IAppState,
	ICardItem,
	IOrderForm,
	IOrderModel,
} from '../types';
import { CardItem } from './CardItem';
import { Model } from './base/Model';

export class AppState extends Model<IAppState> {
	protected _items: ICardItem[];
	protected _preview: string | null;
	protected _basket: CardItem[] = [];
	order: IOrderModel = {
		items: [],
		address: '',
		payment: '',
		total: null,
		phone: '',
		email: '',
	};

	protected formErrors: FormErrors = {};

	set items(items: ICardItem[]) {
		this._items = items.map((item) => new CardItem(item, this.events));
		this.emitChanges('items:changed', { catalog: this._items });
	}

	get items(): ICardItem[] {
		return this._items;
	}

	getItem(id: string): ICardItem {
		return this._items.find((product) => {
			return product.id === id;
		});
	}

	setItems() {
    this.order.items = this.basket.map(item => item.id)
  }

	setPreview(item: CardItem) {
		this._preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	addToBasket(value: CardItem) {
		this._basket.push(value);
	}

	setOrderField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;

		if (this.validateContacts()) {
			this.events.emit('contacts:ready', this.order);
		}
		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	protected validateContacts() {
		const errors: typeof this.formErrors = {};
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}

		this.formErrors = errors;
		this.events.emit('formErrorsContacts:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	protected validateOrder() {
		const errors: typeof this.formErrors = {};

		if (!this.order.payment) {
			errors.payment = 'Необходимо указать способ оплаты';
		}

		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}

		this.formErrors = errors;
		this.events.emit('formErrorsOrder:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	get basketTotalItems(): number {
		return this._basket.length;
	}

	get basket(): CardItem[] {
		return this._basket;
	}

	get basketTotalCost(): number {
		let total = 0;
		this._basket.forEach((item) => {
			total += item.price;
		});
		return total;
	}

	clearBasket() {
		this._basket.length = 0;
	}

	deleteItemFromBasket(id: string) {
		this._basket = this._basket.filter((item) => item.id !== id);
	}

	refreshOrder() {
		this.order = {
			items: [],
			address: '',
			payment: '',
			total: null,
			phone: '',
			email: '',
		};
	}
}
