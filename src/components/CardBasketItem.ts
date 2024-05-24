import { ICardBasketActions } from '../types';
import { Card } from './Card';

export class CardBasketItem extends Card {
	protected _index: HTMLElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardBasketActions
	) {
		super(blockName, container, actions);
		this._index = container.querySelector('.basket__item-index');
		if (this._button) {
			this._button.addEventListener('click', (evt) => {
				this.container.remove();
				actions?.onClick(evt);
			});
		}

	}

	set index(value: number) {
		this._index.textContent = value.toString();
	}
}
