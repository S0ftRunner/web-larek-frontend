import { IOrderForm } from '../types';
import { IEvents } from './base/events';
import { Form } from './Form';
import { BUTTON_ACTIVE } from '../utils/constants';

export class Order extends Form<IOrderForm> {
	protected _online: HTMLButtonElement;
	protected _offline: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLFormElement,
		protected actions: IEvents
	) {
		super(container, actions);

		this._online = container.elements.namedItem('card') as HTMLButtonElement;
		this._offline = container.elements.namedItem('cash') as HTMLButtonElement;

		if (this._online) {
			this._online.addEventListener('click', () => {
				console.log('нажалось на онлайн');
				this._online.classList.add(BUTTON_ACTIVE);
				this._offline.classList.remove(BUTTON_ACTIVE);
				this.onInputChange('payment', 'online');
			});
		}

		if (this._offline) {
			this._offline.addEventListener('click', () => {
				console.log('нажалось на офлайн');
				this._offline.classList.add(BUTTON_ACTIVE);
				this._online.classList.remove(BUTTON_ACTIVE);
				this.onInputChange('payment', 'offline');
			});
		}
	}

	disableButtons() {
		this._online.classList.remove(BUTTON_ACTIVE);
		this._offline.classList.remove(BUTTON_ACTIVE);
	}
}
