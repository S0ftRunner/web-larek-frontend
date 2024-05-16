import { IAppState, IProduct } from "../types";
import { Model } from './base/Model'

export class AppState extends  Model<IAppState> {

	protected _items: IProduct[];

	get items(): IProduct[] {
		return this._items;
	}

	getItem(id: string): IProduct {
		return this._items.find(product => {
			return product.id === id;
		})
	}
}

