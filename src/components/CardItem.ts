import { ICardItem } from '../types';
import { Model } from './base/Model';

export class CardItem extends Model<ICardItem> {
	 id: string;
	 title: string;
	 category: string;
	 description: string;
	 image: string;
	 price?: number;
}
