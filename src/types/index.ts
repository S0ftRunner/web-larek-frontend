

export interface IProduct {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
}


export type Category = 'другое' | 'кнопка' |  'софт-скилл' | 'дополнительное' | 'хард-скилл';

export const NONE_PRICE = 'Бесценно';

export interface IBasketView {
  items: HTMLElement[];
  total: number;
}

export interface IBasketModel{
  items: Map<string, number>;
  add(id: string): void;
  remove(id: string): void;
}

export interface IAppState {
  items: IProduct[];
  getItem(id: string): IProduct;
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
  items: IProduct[];
}