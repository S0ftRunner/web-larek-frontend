import { Component } from './base/Component';
import { IBasketView } from '../types/index';
import { EventEmitter } from './base/events';
import { ensureElement, createElement } from '../utils/utils';

export class Basket extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', container);
		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__button');

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('order:open');
			});
		}
		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
      this._button.disabled = false;
		} else {
      this._button.disabled = true;
		}
	}


	set total(value: number) {
		this.setText(this._total, `${value} синапсов`);
	}

  renderNewIndexes() {
    Array.from(this._list.children).forEach(
      (item, index) =>
      (item.querySelector(`.basket__item-index`)!.textContent = (
        index + 1
      ).toString())
    );
  }

  disableButton() {
    this._button.disabled = true;
  }



}
