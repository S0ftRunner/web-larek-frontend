import { ICatalogModel, IProduct } from "../types";
import { Model } from './base/Model'

export class CatalogModel extends  Model<ICatalogModel> {

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

