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

### 1. Класс `Item`

Один из главных классов, он будет заниматься отрисовкой карточек на главном экране

В конструкторе класса мы будем устанавливать все значения HTML элементам, приходящие к нам из API, а также будем навешивать слушатели событий, для открытия `Popup` карточек.

Класс будет содержать в себе данные поля:

- `protected itemElement: HTMLElement` - будет отвечать за скопированный template
- `protected _id: number` - отвечает за id товара
- `protected name: string` - отвечает за имя товара
- `protected skill: string`, будет показывать, какой скилл дает данный товар
- `protected description: string` -показывает описание товара
- `protected image: string` - отвечает за картинку товара
- `protected price: number` - отвечает за стоимость товара

Класс будет содержать в себе следующие методы:

- `render(item: IItem): HTMLElement` - данный метод будет рендерить наш товар, на вход он должен принимать объект типа `IItem`, возвращать будет `HTMLElement`

Класс будет имплементироваться от интерфейса `IViewItem`.

### 2. Класс `Basket`

Данный класс будет отвечать за отрисовку элементов в `Popup` для корзины. Он будет содержать в себе следующие поля и методы:

- `buttonBasket: HTMLButtonElement` - кнопка для покупки
- `totalPrice: number` - итоговая цена для всех товаров
- `setElements(elementsList: HTMLElement[]): void` - устанавливает элементы в корзине
- `elements: number = 0` - изначальное число элементов в корзине, для отображения количества товаров на главном экране

Класс будет имплементироваться от `IViewBasket`

### 3. Класс `Popup`

Данный класс будет представлять из себя модальное окно. Оно может открываться, закрываться, а также наполняться любым контентом. Поля и методы данного класса:

- `open(): void` - открытие модального окна
- `close(): void` - закрытие модального окна
- `setContent(content: HTMLElement): void` - наполнение контентом модального окна

Класс будет имплементироваться от `IPopup`

### 4. Класс `Page`

Данный класс отвечает за отрисовку элементов всей страницы, он содержит такие поля и методы, как:

- `protected _itemsContainer: HTMLElement` - поле, которое хранит состояние контейнера для товаров
- `protected _basketContainer: HTMLElement` - поле, которое хранит состояние контейнера для корзины
- `setItemsContainer(container: HTMLElement): void` - устанавливаем контейнер для вывода
  карточек товаров
- `setBasketContainer(container: HTMLElement): void`

### 5. Класс `Form`

Данный класс будет отвечать за работу форм на нашем сайте. Он будет иметь следующие поля и методы:

- `inputElements: HTMLInputElement[]` - количество элементов ввода
- `error: HTMLElement` - содержит HTML-разметку для ошибки
- `getValue(): string` - берем значение из поля ввода
- `setValue(value: string): void` - устанавливаем значение для поля ввода
- `clearValue(): void` - очищает поля ввода
- `setButtonText(value: string)` - устанавливает текст на кнопке формы
- `setPlaceholder(value: string)` - устанавливает текст для подсказки
- `render(): HTMLFormElement` - данный метод занимается рендерингом элемента формы

## Cлой модели. `Model`

### 1. Класс `Model`

Данный класс является основным классом для работы с моделью нашего приложения. Он будет содержать в себе поля и методы для работы с данными, которые приходят к нам из API. На основе их будет рендеринг в дальнейшем элементов `Item` из слоя `View`.

Поля:

- `items: IItem[]` - массив товаров
- `addItem(data: IItem): void` - добавление товара
- `getItem(id: number): IItem` - получение товара

Данный класс будет имплементироваться от интерфейса `IModel`

### 2. Класс `Order`

Данный класс описывает, как в принципе должны выглядеть заказы. Содержит следующие поля:

- `payWay: PayWay` - пользовательский тип данных, который определяет оплату заказа
- `address: string` - адрес доставки
- `phone: string` - номер телефона
- `email: string` - почта клиента
- для всех этих полей будут присутствовать геттеры и сеттеры

Данный класс будет имплементироваться от `IOrder`. Данный класс будет реализовывать паттерн `Builder`, так как заказ собирается постепенно.

### 3. Класс `BasketModel`

Данный класс нужен для того, чтобы мы хранили данные для элементов, которые будут в корзине

Слой `Presenter`

В данном слое будет всего лишь один класс, `Presenter`. Он будет рендерить карточки, описывать слушателей событий

## Пользовательские типы данных

```ts
export interface IProduct {
	id: string;
	name: string;
	skill: string;
	description: string;
	image: string;
	price: number;
}

export type Category =
	| 'другое'
	| 'кнопка'
	| 'софт-скилл'
	| 'дополнительное'
	| 'хард-скилл';

export interface IBasketView {
	items: HTMLElement[];
	total: number;
}

export interface IBasketModel {
	items: Map<string, number>;
	add(id: string): void;
	remove(id: string): void;
}

export interface IModel {
	items: IProduct[];
	addItem(data: IProduct): void;
	getItem(id: number): IProduct;
}

export interface IPopup {
	close(): void;
	open(): void;
	content: HTMLElement;
}

type PayWay = 'онлайн' | 'при получении';

export interface IOrder {
	items: string[];
	payWay: PayWay;
	address: string;
	phone: string;
	email: string;
	total: number;
}

export interface IForm {
	submit: HTMLButtonElement;
	errors: HTMLElement[];
}

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export interface IPage {
	counter: HTMLElement;
	basketContainer: HTMLElement;
	catalog: HTMLElement[];
}

export interface ICardAction {
	onClick(event: MouseEvent): void;
}

export interface ApiResponse {
	items: IProduct[];
}
```
