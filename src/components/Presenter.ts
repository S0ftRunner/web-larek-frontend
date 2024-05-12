import { IModel, IPage, IPopup } from '../types';
import {API_URL} from '../utils/constants'
import { ensureElement } from '../utils/utils';
import { Api } from './base/api';
import {ICardConstructor} from './Card';

export class Presenter {
	protected cardTemplate: HTMLTemplateElement;
  protected api = new Api(API_URL);

	constructor(
		protected model: IModel,
		protected viewPageContainer: IPage,
		protected cardItemConstructor: ICardConstructor,
		// protected modal: IPopup
	) {
		this.cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
	
  }

	init() {
	}


	renderView() {
		const cardList = this.model.items.map(card => {
			const cardView = new this.cardItemConstructor(this.cardTemplate);
			const cardElement = cardView.render(card);
			return cardElement;
		})

		this.viewPageContainer.catalog = cardList;
	}
}
