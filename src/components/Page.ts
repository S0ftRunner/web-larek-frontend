import { IPage } from "../types";

export class Page implements IPage {
  protected _catalog: HTMLElement;
  protected _basket: HTMLElement;
  protected _counter: HTMLElement;

  constructor(protected container: HTMLElement) {
    this._catalog = this.container.querySelector('.gallery');
    this._basket = this.container.querySelector('.header__basket');
    this._counter = this.container.querySelector('.header__basket-counter');
  }

  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items);
  }

  set counter(element: HTMLElement) {
    this._counter = element;
  }

  set basketContainer(basketElement: HTMLElement) {
    this._basket = basketElement;
  }
}