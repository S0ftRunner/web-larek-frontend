import { IAppState, ICardItem } from '../types';
import { CardItem } from './CardItem';
import { Model } from './base/Model';

export class AppState extends Model<IAppState> {
	protected _items: ICardItem[];
	protected _preview: string | null;
	protected _basket: CardItem[] = [];

	set items(items: ICardItem[]) {
		this._items = items.map((item) => new CardItem(item, this.events));
		this.emitChanges('items:changed', { catalog: this._items });
	}

	get items(): ICardItem[] {
		return this._items;
	}

	getItem(id: string): ICardItem {
		return this._items.find((product) => {
			return product.id === id;
		});
	}


	setPreview(item: CardItem) {
		this._preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	addToBasket(value: CardItem) {
		this._basket.push(value);
	}

	get basketTotalItems(): number {
		return this._basket.length;
	}

	get basket(): CardItem[] {
		return this._basket;
	}

	get basketTotalCost(): number {
		let total = 0;
		this._basket.forEach(item => {
			total += item.price;
		});
		return total;
	}

	deleteItemFromBasket(id: string) {
		this._basket = this._basket.filter(item => item.id !== id);
	}
}
