

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

export interface ICardBasketActions{
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

export interface IPopup {
	close(): void;
	open(): void;
	content: HTMLElement;
}

type PayWay = 'онлайн' | 'при получении';

export interface IOrder {
	items: string[];
	payWay: PayWay;
	address: string;
	phone: string;
	email: string;
	total: number;
}

export interface IForm {
	submit: HTMLButtonElement;
	errors: HTMLElement[];
}

export interface IFormState {
	valid: boolean;
	errors: string[];
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
