export interface IViewItem {
	id: number;
	name: string;
	skill: string;
	description: string;
	image: string;
	price: number;
	handleOpenItem: Function;
	render(item: IViewItem): HTMLElement;
	setOpenHandler(handleOpenItem: Function): void;
}

export interface IItem {
  id: number;
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
  payWay: PayWay;
  address: string;
  phone: string;
  email: string;
}

export interface IForm {
  submit: HTMLButtonElement;
  errors: HTMLElement[];
}

export interface IPage {
  counter: HTMLElement;
  catalog: HTMLElement;
}