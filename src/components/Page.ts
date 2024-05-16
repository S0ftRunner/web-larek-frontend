import { IPage } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class Page extends Component<IPage> {

  protected _counter: HTMLElement;
  protected _catalog: HTMLElement;
  protected _basket: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this._catalog = ensureElement<HTMLElement>('.gallery');
    this._counter = ensureElement<HTMLElement>('.header__basket-counter');
    this._basket = ensureElement<HTMLElement>('.basket');
  }


  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items);
  }

}