import { IItem, IModel } from '../types';

export class Model implements IModel {
	protected _items: IItem[];

	constructor() {
		this._items = [];
	}

	set items(data: IItem[]) {
		this._items = data;
	}

	getItem(id: number): IItem  {
		// return this._items.find((item) => item.id === id);
		return this._items[0];
	}

	addItem(data: IItem): void {
		const newItem: IItem = {
			id: data.id,
			name: data.name,
			skill: data.skill,
			description: data.description,
			image: data.image,
			price: data.price,
		};

    this._items.push(newItem);
	}
}
