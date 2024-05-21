import { IContacts } from "../types";
import { Form } from "./Form";
import { IEvents } from "./base/events";

export class Contacts extends Form<IContacts> {
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  }
}