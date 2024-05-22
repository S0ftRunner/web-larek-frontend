import { Component } from './base/Component';

export interface ISuccessAction {
	onClick: (event: MouseEvent) => void;
}

export interface ISuccess {
	description: number;
}

export class Success extends Component<ISuccess> {
	protected _description: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		events?: ISuccessAction
	) {
		super(container);

		this._button = container.querySelector(`.${blockName}__close`);
		this._description = container.querySelector(`.${blockName}__description`);

		if (events?.onClick) {
			this._button.addEventListener('click', events.onClick);
		}
	}

	set description(value: number) {
		console.log('установилась цена');
		this._description.textContent = `Списано ${value} синапсов`;
	}
}
