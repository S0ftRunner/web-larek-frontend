import {
	FormErrors,
	IAppState,
	ICardItem,
	IFinalOrder,
	IOrderModel,
} from '../types';
import { Model } from './base/Model';

export class AppState extends Model<IAppState> {
	protected _items: ICardItem[];
	protected _preview: string | null;
	protected _basket: ICardItem[] = [];
	order: IOrderModel = {
		address: '',
		payment: '',
		phone: '',
		email: '',
	};

	protected formErrors: FormErrors = {};

	set items(items: ICardItem[]) {
		this._items = items.map((item) => item);
		this.emitChanges('items:changed', { catalog: this._items });
	}

	get items(): ICardItem[] {
		return this._items;
	}

	protected getIds(): string[] {
		return this._basket.map(item => item.id);
	}

	setPreview(item: ICardItem) {
		this._preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	addToBasket(value: ICardItem) {
		this._basket.push(value);
	}

	setOrderField(field: keyof IOrderModel, value: string) {
		this.order[field] = value;

		if (this.validateContacts()) {
			this.events.emit('contacts:ready', this.order);
		}
		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	protected validateContacts(): boolean {
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

	protected validateOrder(): boolean {
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

	get basket(): ICardItem[] {
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


	makeOrder(): IFinalOrder {
		const orderObject: IFinalOrder = {
			address: this.order.address,
			payment: this.order.payment,
			phone: this.order.phone,
			email: this.order.email,
			items: this.getIds(),
			total: this.basketTotalCost,
		}

		return orderObject;
	}

	resetSelected() {
		this._items.forEach(item => {
			item.selected = false;
		})
	}

	refreshOrder() {
		this.order = {
			address: '',
			payment: '',
			phone: '',
			email: '',
		};
	}
}
