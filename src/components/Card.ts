import { ICardAction, IItem, IViewItem } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

export interface ICardConstructor {
  new (template: HTMLTemplateElement): IViewItem;
}

export class Card extends Component<IViewItem> implements IViewItem {


  protected itemElement: HTMLElement;

  protected cardCategory: HTMLElement;
  protected cardTitle: HTMLElement;
  protected cardImage: HTMLImageElement;
  protected cardPrice: HTMLElement;


  constructor(protected blockName: string, container: HTMLElement, actions?: ICardAction){
    super(container);
    this.cardTitle = ensureElement<HTMLElement>(`.${blockName}__title`, container);
    this.cardCategory = ensureElement<HTMLElement>(`.${blockName}__category`, container);
    this.cardImage = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
    this.cardPrice = ensureElement<HTMLElement>(`.${blockName}__price`, container);
  }

  set id(value: string) {
    this.id = value;
  }

  set name(value: string) {
    this.cardTitle.textContent = value;
  }

  set skill(value: string) {
    this.cardCategory.textContent = value;
  }

  set description(value: string) {
    this.description = value;
  }

  set image(value: string) {
    this.cardTitle.textContent = value;
  }

  set price(value: number) {
    this.cardPrice.textContent = String(value);
  }

  render(item: IItem): HTMLElement {
      this.id = item.id;
      this.name = item.name;
      this.description = item.description;
      this.price = item.price;
      this.skill = item.skill;
      this.image = item.image;
      return this.itemElement;
  }
}