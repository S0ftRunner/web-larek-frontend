import { Model } from "../components/base/Model";

export interface ICardItem extends Model<ICardItem> {
	id: string;
	title: string;
	category: Category;
	description: string;
	image: string;
	price?: number;
	// selected: boolean;
}

export interface ICardViewItem {
	title: string;
	category: Category;
	description: string;
	image: string;
	price?: number;
	index?: number;
}


export interface IBasketView {
	items: HTMLElement[];
	total: number;
}

export interface ICardBasketItem extends ICardItem {
	index: number;
}

export interface ICardBasketActions {
	onClick: (event: MouseEvent) => void;
}

export type Category =
	| 'другое'
	| 'кнопка'
	| 'софт-скил'
	| 'дополнительное'
	| 'хард-скил';

export interface IAppState {
	cards: ICardItem[];
	setItems: () => void;
	order: IOrderModel;
	setPreview: (item: ICardItem) => void;
	addToBasket: (value: ICardItem) => void;
	setOrderField: (field: keyof IOrderForm, value: string) => void;
	validateContacts: () => boolean;
	validateOrder: () => boolean;
	clearBaslet: () => void;
	deleteItemFromBasket: (id: string) => void;
	refreshOrder: () => void; 
}

export interface IContacts {
	email: string;
	phone: string;
}

export interface IOrderForm {
	payment: string;
	address: string;
	email: string;
	phone: string;
}

export interface IOrderModel {
	payment: string;
	address: string;
	email: string;
	phone: string;
}

export interface IForm {
	valid: boolean;
	errors: string[];
}

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export type FormErrors = Partial<Record<keyof IOrderModel, string>>;

export interface IModal {
	content: HTMLElement;
}

export interface IPage {
	counter: HTMLElement;
	basketContainer: HTMLElement;
	catalog: HTMLElement;
}

export interface ICardAction {
	onClick(event: MouseEvent): void;
}

export interface ApiResponse {
	items: ICardItem[];
}
