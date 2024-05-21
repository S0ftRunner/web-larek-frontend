export interface ICardItem {
	id: string;
	title: string;
	category: Category;
	description: string;
	image: string;
	price?: number;
}

export interface ICardViewItem {
	title: string;
	category: Category;
	description: string;
	image: string;
	price?: number;
}

export const NONE_PRICE = 'Бесценно';

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
	getItem(id: string): ICardItem;
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
	items: string[];
	payment: string;
	address: string;
	email: string;
	phone: string;
	total: number;
};

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
