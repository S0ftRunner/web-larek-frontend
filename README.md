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


### Интерфейс IItem

Интерфейс IItem будет представлять собой пользовательский тип данных, который будет декларировать поля и методы для рендеринга класса `Item`

Поля интерфейса:
- `id: number` - id товара
- `name: string` - имя товара
- `skill: string` - скилл товара
- `description: string` - описание товара
- `image: string` - картинка товара
- `price: number` - цена товара