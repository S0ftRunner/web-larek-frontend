import { Component } from './base/Component';

import { ensureElement } from '../utils/utils';

import { IProduct, NONE_PRICE } from '../types/index';

export class Card extends Component<IProduct> {
	protected _title: HTMLElement;
	protected _category: HTMLElement;
	protected _image: HTMLImageElement;
	protected _price: HTMLElement;

	constructor(protected blockName: string, container: HTMLElement) {
		super(container);
		this._title = ensureElement<HTMLElement>(`.${blockName}__title`);
		this._category = ensureElement<HTMLElement>(`.${blockName}__category`);
		this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`);
		this._price = ensureElement<HTMLElement>(`.${blockName}__price`);
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set image(value: string) {
		this.setImage(this._image, value);
	}

	setPrice(value?: number) {
		if (value === null) {
			this.setText(this._price, NONE_PRICE);
		} else {
			this.setText(this._price, `${value} синапсов`);
		}
	}
}

export class CatalogItem extends Card {
	constructor(container: HTMLElement) {
		super('card', container);
	}
}
