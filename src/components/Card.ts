import { Component } from './base/Component';

import { ensureElement } from '../utils/utils';

import { Category, ICardViewItem, NONE_PRICE } from '../types/index';
import { CDN_URL } from '../utils/constants';

export class Card extends Component<ICardViewItem> {
	protected _title: HTMLElement;
	protected _category: HTMLElement;
	protected _image: HTMLImageElement;
	protected _price: HTMLElement;

	constructor(protected blockName: string, container: HTMLElement) {
		super(container);
		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._category = container.querySelector(`.${blockName}__category`);
		this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
		this._price = container.querySelector(`.${blockName}__price`);
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

	}
}

export class CatalogItem extends Card {
	constructor(container: HTMLElement) {
		super('card', container);
	}
}
