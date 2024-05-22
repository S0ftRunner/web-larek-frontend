import { ICardBasketItem, ICardBasketActions } from '../types';
import { NONE_PRICE } from '../utils/constants';
import { Component } from './base/Component';

export class BasketItem extends Component<ICardBasketItem> {
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardBasketActions
	) {
		super(container);

		this._title = container.querySelector(`.${blockName}__title`);
		this._price = container.querySelector(`.${blockName}__price`);
		this._button = container.querySelector(`.${blockName}__button`);
		this._index = container.querySelector('.basket__item-index');

		if (this._button) {
			this._button.addEventListener('click', (evt) => {
				this.container.remove();
				actions?.onClick(evt);
			});
		}
	}

	set title(value: string) {
		this._title.textContent = value;
	}

	set index(value: number) {
		this._index.textContent = value.toString();
	}

	set price(value: number) {
		if (value === null) {
			this._price.textContent = NONE_PRICE;
		} else {
			this._price.textContent = `${value} синапсов`;
		}
	}
}
