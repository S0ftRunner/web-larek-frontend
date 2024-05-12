export interface IViewItem {
	id: string;
	name: string;
	skill: string;
	description: string;
	image: string;
	price: number;
	// handleOpenItem: Function;
	render(item: IItem): HTMLElement;
	// setOpenHandler(handleOpenItem: Function): void;
}

export interface IItem {
  id: string;
  name: string;
  skill: string;
  description: string;
  image: string;
  price: number;
}

export interface IBasketView {
  items: HTMLElement[];
  total: number;
}

export interface IBasketModel{
  items: Map<string, number>;
  add(id: string): void;
  remove(id: string): void;
}

export interface IModel {
  items: IItem[];
  addItem(data: IItem): void;
  getItem(id: number): IItem;
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
  catalog: HTMLElement[];
}

export interface ICardAction {
  onClick(event: MouseEvent): void;
}

export interface ApiResponse {
  items: IItem[];
}