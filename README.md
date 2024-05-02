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

### Класс `Item`

Класс `Item` занимается отрисовкой элемента товара. Его функции: отображение товара, при клике на него будет открываться модальное окно, с описанием данного товара. 

Класс будет содержать в себе данные поля:
- `protected itemElement: HTMLElement` - будет отвечать за скопированный template
- `protected _id: number` - отвечает за id товара
- `protected name: string` - отвечает за имя товара
- `protected skill: string`, будет показывать, какой скилл дает данный товар
- `protected description: string` -показывает описание товара
- `protected image: string` - отвечает за картинку товара
- `protected price: number` - отвечает за стоимость товара
- `handleOpenItem: Function` - отвечает за привязку функции открытия товара

Класс будет содержать в себе следующие методы:
- `render(item: IItem): HTMLElement` - данный метод будет рендерить наш товар, на вход он должен принимать объект типа `IItem`, возвращать будет `HTMLElement`
- `setOpenHandler(handleOpenItem: Function): void` -- данный метод будет принимать функцию обработчик, которая будет отвечать за открытие элемента

Класс будет имплементироваться от интерфейса `IViewItem`, который будет обладать следующими полями:
- `id: number`
- `name: string`
- `skill: string`
- `description: string`
- `image: string`
- `price: number`
- `handleOpenItem: Function`

Интерфейс будет обладать следущими методами:
- `render(item: IViewItem): HTMLElement`
- `setOpenHandler(handleOpenItem: Function): void`


```ts
interface IViewItem {
  id: number;
  name: string;
  skill: string;
  description: string;
  image: string;
  price: number;
  handleOpenItem: Function;
  render(item: IViewItem): HTMLElement;
  setOpenHandler(handleOpenItem: Function): void;
} 

```


### Интерфейс `IItem`

Интерфейс IItem будет представлять собой пользовательский тип данных, который будет декларировать поля и методы для рендеринга класса `Item`

Поля интерфейса:
- `id: number` - id товара
- `name: string` - имя товара
- `skill: string` - скилл товара
- `description: string` - описание товара
- `image: string` - картинка товара
- `price: number` - цена товара

```ts
interface IItem {
  id: number;
  name: string;
  skill: string;
  description: string;
  image: string;
  price: number;
}
```

### Интерфейс `IBasketView`

Данный интерфейс представляет из себя пользовательский тип, который содержит в себе массив товаров, которые в свою очередь представлены в виде HTML разметки. Также он должен иметь поле `total`, где будет указана итоговая сумма всех товаров

Поля:
- `items: HTMLElement[]`
- `total: number`

```ts
interface IBasketView {
  items: HTMLElement[];
  total: number;
}
```

### Класс `Basket`

Данный класс имплементирует свойства интерфейса `IBasketView`. Также он будет содержать в себе дополнитеное поле `counter`. Оно будет отвечать за количество товаров в корзине.

### Интерфейс `IModel`

Данный интерфейс будет представлять собой пользовательский тип данных, который будет выглядеть следующим образом:

Поля:
- `items: IItem[]` - массив товаров
- `addItem(data: IItem): void` - добавление товара
- `getItem(id: number): IItem` - получение товара

```ts
interface IModel {
  items: IItem[];
  addItem(data: IItem): void;
  getItem(id: number): IItem;
}
  
```

От данного интерфейса будет имплементироваться класс `Model`, который будет реализовывать все поля и методы данного интерфейса

### Интерфейс `IPopup`

Данный интерфейс будет описывать логику поведения модальный окон. Он будет содержать следующие поля:
- `close(): void` - закрытие попапа
- `open(): void` - открытие попапа
- `content: HTMLElement` - наполнение попапа

```ts
interface IPopup {
  close(): void;
  open(): void;
  content: HTMLElement;
}

```

От данного интерфейса будет имплементироваться класс `Popup`, который будет иметь все те же самые поля.

### Интерфейс `IOrder`

Данный интерфейс описывает, как в принципе должны выглядеть заказы. Содержит следующие поля:
- `payWay: PayWay` - пользовательский тип данных, который определяет оплату заказа
- `address: string` - адрес доставки
- `phone: string` - номер телефона
- `email: string` - почта клиента

`PayWay` - это пользовательский тип данных, который выглядит следующим образом:
```ts
type PayWay = 'онлайн' | 'при получении';
```

От данного интерфейса будет имплементироваться класс `Order`, который к дополнению будет иметь и сеттеры для полей выше описанных


```ts
interface IOrder {
  payWay: PayWay;
  address: string;
  phone: string;
  email: string;
}

```

### Интерфейс `IForm`

Данный интерфейс будет описывать общую логику работы формы. Он имеет следующие поля:

- `submit: HTMLButtonElement` - кнопка подтверждения отправки формы
- `errors: HTMLElement[]` - массив для вывода ошибок

```ts
interface IForm {
  submit: HTMLButtonElement;
  errors: HTMLElement[];
}
```

### Интерфейс `IPage`

Данный интерфейс описывает элементы, которые должны быть на основной странице. Имеет следующие поля:
- `counter: HTMLElement` - счетчик для корзины
- `catalog: HTMLElement` - контейнер для товаров

```ts
interface IPage {
  counter: HTMLElement;
  catalog: HTMLElement;
}
```

