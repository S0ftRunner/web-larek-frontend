import { Component } from './base/Component';
import { IBasketView } from '../types/index';
import { EventEmitter } from './base/Events';
import { ensureElement } from '../utils/utils';

export class BasketView extends Component<IBasketView> {
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
				this.events.emit('order:open');
			});
		}
		this.items = [];
	}

	set items(items: HTMLElement[]) {
		this._list.replaceChildren(...items);
		this._button.disabled = items.length ? false : true;
	}


	set total(value: number) {
		this.setText(this._total, `${value} синапсов`);
	}

	disableButton() {
		this._button.disabled = true;
	}


}
