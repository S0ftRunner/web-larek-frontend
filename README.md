# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Документация

Данное приложение использует архитектуру `MVP`

## Компоненты для представления. `View`

### 1. Класс `Component`

Основной класс для всех классов слоя `View`. От него наследуются все классы в данном слое.

Выглядит следующим образом:

```ts
export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {}

    // Инструментарий для работы с DOM в дочерних компонентах

    // Переключить класс
    toggleClass(element: HTMLElement, className: string, force?: boolean) {}

    // Установить текстовое содержимое
    protected setText(element: HTMLElement, value: unknown) {}

    // Сменить статус блокировки
    setDisabled(element: HTMLElement, state: boolean) {}

    // Скрыть
    protected setHidden(element: HTMLElement) {}

    // Показать
    protected setVisible(element: HTMLElement) {}

    // Установить изображение с алтернативным текстом
    protected setImage(element: HTMLImageElement, src: string, alt?: string) {}

    // Вернуть корневой DOM-элемент
    render(data?: Partial<T>): HTMLElement {}
}
```

### 2. Класс `Card`

Данный класс будет заниматься отрисовкой карточек на главном экране

В конструкторе класса мы будем устанавливать все значения HTML элементам, приходящие к нам из API через `AppState`, а также будем навешивать слушатели событий, для открытия `Popup` карточек.

Класс будет выглядеть следующим образом:

```ts
export class Card extends Component<ICardViewItem> {
	// название карточки
	protected _title: HTMLElement;

	// категория карточки
	protected _category: HTMLElement;

	// изображение карточки
	protected _image?: HTMLImageElement;

	// цена карточки
	protected _price: HTMLElement;

	// кнопка для различных событий
	protected _button?: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {}

	// сеттер названия
	set title(value: string) {}

	//геттер названия
	get title(): string {}

	// сеттер изображения
	set image(value: string) {}

	// сеттер цены
	set price(value: number | null) {}

	// сеттер категории
	set category(value: Category) {}
}
```

В одном файле с этим классом будут присутствовать два его наследника, они будут отвечать за разный рендеринг данных. То есть, класс `CatalogItem` будет отвечать за рендер карточки на главной странице, а `CardPreview` будет отвечать за рендер карточки в модальном окне. Отдельно нужен `CardPreview`, потому что в модальном окне карточки добавляется и описание карточки товара.

Вот как выглядят данные классы:

```ts
export class CatalogItem extends Card {
	constructor(container: HTMLElement, actions?: ICardActions) {}
}

export class CardPreview extends Card{
	// описание карточки
	protected _description: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {}

	// сеттер описания
	set description(value: string){}

}
```

### 3. Класс `BasketView`

Данный класс будет отвечать за отображение самой корзины, элементов в ней. Он также наследуется от `Component`.

```ts
export class BasketView extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {}

	// сеттер элементов корзины
	set items(items: HTMLElement[]) {}

	// сеттер общей суммы покупки
	set total(value: number) {
		this.setText(this._total, `${value} синапсов`);
	}

	// генерируем новые индексы для элементов(нужно при удалении из корзины)
	renderNewIndexes() {}

	// делаем кнопку неактивной
	disableButton() {}
}
```
### 4. Класс `CardBasketItem`

Данный класс реализует View для элемента в корзине товара. Выглядит следующим образом:

```ts
export class BasketItem extends Component<ICardBasketItem> {

	// индекс товара
	protected _index: HTMLElement;

	// название товара
	protected _title: HTMLElement;

	//  цена товара
	protected _price: HTMLElement;

	// кнопка
	protected _button: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardBasketActions
	) {}

	// сеттер названия
	set title(value: string) {}

	// сеттер индекса
	set index(value: number) {}

	// сеттер цены
	set price(value: number) {}
}

```

### 4. Класс `Modal`

Данный класс будет представлять из себя модальное окно. Оно может открываться, закрываться, а также наполняться любым контентом. Поля и методы данного класса:

```ts
export class Modal extends Component<IModal> {

	// кнопка закрытия модального окна
  protected _closeButton: HTMLButtonElement;

	// контент модального окна
  protected _content: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {}

	// установление контента в модальное окно
  set content(value: HTMLElement) {}

	// открытие модального окна 
  open() {}

	// закрытие модального окна
  close() {}

	// рендер модального окна
  render(data: IModal):HTMLElement {}
```

### 5. Класс `Page`

Данный класс отвечает за отрисовку элементов всей страницы.

```ts
export class Page extends Component<IPage> {

	// счетчик корзины
  protected _counter: HTMLElement;

	// каталог
  protected _catalog: HTMLElement;

	// корзина
  protected _basket: HTMLElement;

	// нужно для блокировки прокрутки
  protected _wrapper: HTMLElement;


  constructor(container: HTMLElement, protected events: IEvents) {}

	// сеттер каталога
  set catalog(items: HTMLElement[]) {}

	// блокировка прокрутки страницы при открытии модального окна или каких-либо других элементов
  set locked(value: boolean) {}

	// сеттер счетчика корзины
  set basketCounter(value: number) {}
}

```

### 6. Класс `Form`

Данный класс будет отвечать за работу форм на нашем сайте. От данного класса у нас будут наследоваться `Order` и `Contacts`. Он будет выглядеть следующим образом:

```ts
export class Form<T> extends Component<IFormState> {

	// кнопка сабмита
	protected _submit: HTMLButtonElement;

	// отображение ошибки
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {}

	// изменение данных при вводе
	protected onInputChange(field: keyof T, value: string) {}

	// переключение кнопки submit при введении данных
	set valid(value: boolean) {}

	// установка ошибок
	set errors(value: string) {}

	// рендер формы
	render(state: Partial<T> & IFormState) {}
```
### 7. Класс `Order`

Данный класс наследуется от класса `Form`. Содержит дополнительные элементы, такие как кнопки. Данный класс выглядит так:

```ts
export class Order extends Form<IOrderForm> {

	// кнопка для оплаты по карте
	protected _online: HTMLButtonElement;

	// кнопка для оплаты по наличному рассчету
	protected _offline: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLFormElement,
		protected actions: IEvents
	) {}

	// кнопки становятся неактивными
	disableButtons() {}
}
```

### 8. Класс `Contacts`

Данный класс также наследуется от класса `Form`. Дополнительных полей не имеет. Выглядит следующим образом:

```ts
export class Contacts extends Form<IContacts> {
	constructor(container: HTMLFormElement, events: IEvents) {}
}
```

### 9. Класс `Success`

Данный класс в нашем сайте нужен для дальнейшего его отображения в модальном окне. Он нам дает информацию о том, что покупка прошла успешно. Его реализация:

```ts
export class Success extends Component<ISuccess> {

	// описание покупки
	protected _description: HTMLElement;

	// кнопка
	protected _button: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		events?: ISuccessAction
	) {}

	// сеттер описания
	set description(value: number) {}
```
## Cлой модели. `Model`

### 1. Класс `Model`

Данный класс является базовым для нашего слоя `Model`. От него будет наследоваться в нашем случае класс `AppState`, который отвечает за всю логику работы приложения с данными. Выглядит следующим образом:

```ts
export abstract class Model<T> {
	constructor(data: Partial<T>, protected events: IEvents) {}

	// вызов событий
	emitChanges(event: string, payload?: object) {}
}
```

### 2. Класс `AppState`

Данный класс описывает всю работу с данными в нашем приложении. Наследуется от класса `Model`. Его структура:

```ts
export class AppState extends Model<IAppState> {

	// элементы товаров
	protected _items: ICardItem[];

	// превью карточки
	protected _preview: string | null;

	// модель для корзины
	protected _basket: CardItem[] = [];

	// объект заказа
	order: IOrderModel = {
		items: [],
		address: '',
		payment: '',
		total: null,
		phone: '',
		email: '',
	};

	// нужно для ошибок
	protected formErrors: FormErrors = {};

	// установка товаров
	set items(items: ICardItem[]) {}

	// геттер товаров
	get items(): ICardItem[] {}

	// установка товаров в заказ из корзины
	setItems() {}

	// установка превью карточки
	setPreview(item: CardItem) {}

	// добавление в корзину
	addToBasket(value: CardItem) {}

	// установка полей заказа
	setOrderField(field: keyof IOrderForm, value: string) {}

	// валидируемость контактов
	protected validateContacts() {}

	// валидируемость заказа
	protected validateOrder() {}

	// геттер количества элементов корзины
	get basketTotalItems(): number {}

	// геттер элементов корзины
	get basket(): CardItem[] {}

	// общая стоимость корзины
	get basketTotalCost(): number {}

	// очистка корзины
	clearBasket() {}

	// удаление товара по id
	deleteItemFromBasket(id: string) {}

	// обнуление заказа
	refreshOrder() {}
}
```

## Пользовательские типы данных

```ts
export interface ICardItem {
	id: string;
	title: string;
	category: Category;
	description: string;
	image: string;
	price?: number;
}

export interface ICardViewItem {
	title: string;
	category: Category;
	description: string;
	image: string;
	price?: number;
}


export interface IBasketView {
	items: HTMLElement[];
	total: number;
}

export interface ICardBasketItem extends ICardItem {
	index: number;
}

export interface ICardBasketActions {
	onClick: (event: MouseEvent) => void;
}

export type Category =
	| 'другое'
	| 'кнопка'
	| 'софт-скил'
	| 'дополнительное'
	| 'хард-скил';

export interface IAppState {
	cards: ICardItem[];
	setItems: () => void;
	order: IOrderModel;
	setPreview: (item: CardItem) => void;
	addToBasket: (value: CardItem) => void;
	setOrderField: (field: keyof IOrderForm, value: string) => void;
	validateContacts: () => boolean;
	validateOrder: () => boolean;
	clearBaslet: () => void;
	deleteItemFromBasket: (id: string) => void;
	refreshOrder: () => void; 
}

export interface IContacts {
	email: string;
	phone: string;
}

export interface IOrderForm {
	payment: string;
	address: string;
	email: string;
	phone: string;
}

export interface IOrderModel {
	items: string[];
	payment: string;
	address: string;
	email: string;
	phone: string;
	total: number;
}

export interface IForm {
	valid: boolean;
	errors: string[];
}

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export type FormErrors = Partial<Record<keyof IOrderModel, string>>;

export interface IModal {
	content: HTMLElement;
}

export interface IPage {
	counter: HTMLElement;
	basketContainer: HTMLElement;
	catalog: HTMLElement;
}

export interface ICardAction {
	onClick(event: MouseEvent): void;
}

export interface ApiResponse {
	items: ICardItem[];
}

```

## Events

Для обработки событий использован специальный класс - `EvenEmmiter`. Его структура выглядит так:

```ts

export class EventEmitter implements IEvents {
	_events: Map<EventName, Set<Subscriber>>;

	constructor() {}

	/**
	 * Установить обработчик на событие
	 */
	on<T extends object>(eventName: EventName, callback: (event: T) => void) {}

	/**
	 * Снять обработчик с события
	 */
	off(eventName: EventName, callback: Subscriber) {}

	/**
	 * Инициировать событие с данными
	 */
	emit<T extends object>(eventName: string, data?: T) {}

	/**
	 * Слушать все события
	 */
	onAll(callback: (event: EmitterEvent) => void) {}

	/**
	 * Сбросить все обработчики
	 */
	offAll() {}

	/**
	 * Сделать коллбек триггер, генерирующий событие при вызове
	 */
	trigger<T extends object>(eventName: string, context?: Partial<T>) {}
}
```

### События

- `items:changed`: делает рендер карточек при изменении состояния
- `card:select`: вызывается при клике на карточку товара
- `preview:changed`: открывает модальное окно с выбранной карточкой товара
- `card:toBasket`: отправка карточки товара в корзину
- `basket:open`: открытие модального окна корзины
- `basket:delete`: удаление элемента из корзины
- `order:open`: открытие модального окна с полями для заказа
- `formErrorsOrder:change`: событие для вывода ошибок для заказа(адрес и кнопка оплаты)
- `formErrorsContacts:change`: событие для вывода ошибок для контактов
- `orderInput:change`: срабатывание события при вводе в поля формы
- `order:submit`: сабмит событие для заказа
- `contacts:submit`: сабмит событие для контактов
- `order:success`: выполняется, когда приходит корретный ответ от сервера
- `modal:open`: открытие модального окна
- `modal:close`: закрытие модального окна