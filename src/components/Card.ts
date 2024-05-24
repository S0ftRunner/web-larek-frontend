import { Component } from './base/Component';

import { ensureElement } from '../utils/utils';
import { CategoryMap } from '../utils/constants';

import { Category, ICardViewItem } from '../types/index';
import { CDN_URL, NONE_PRICE } from '../utils/constants';

export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class Card extends Component<ICardViewItem> {
	protected _title: HTMLElement;
	protected _category?: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _price: HTMLElement;
	protected _button?: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(container);
		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._category = container.querySelector(`.${blockName}__category`);
		this._button = container.querySelector(`.${blockName}__button`);

		this._image = container.querySelector(`.${blockName}__image`);
		this._price = container.querySelector(`.${blockName}__price`);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set image(value: string) {
		this.setImage(this._image, CDN_URL + value);
	}

	set price(value: number | null) {
		if (value === null) {
			this.setText(this._price, NONE_PRICE);
		} else {
			this.setText(this._price, `${value} синапсов`);
		}
	}

	set category(value: Category) {
		this._category.textContent = value;
		this._category.classList.add(CategoryMap[value]);
	}
}

export class CardPreview extends Card {
	protected _description: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super('card', container, actions);
		this._description = ensureElement<HTMLElement>('.card__text', container);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}
}
