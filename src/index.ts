import './scss/styles.scss';

import { API_URL, CDN_URL } from './utils/constants';

import { Api } from './components/base/api';

import { ensureElement, cloneTemplate, createElement } from './utils/utils';

import { EventEmitter } from './components/base/events';

const events = new EventEmitter();
const api = new Api(API_URL);

// мониторим все события для отладки
events.onAll(({eventName, data}) => {
  console.log(eventName, data);
})

// шаблоны
const templateSucces = ensureElement<HTMLTemplateElement>('#success');
const templateCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const templateCardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const templateCardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const templateBasket = ensureElement<HTMLTemplateElement>('#basket');
const templateOrder = ensureElement<HTMLTemplateElement>('#order');
const templateContacts = ensureElement<HTMLTemplateElement>('#contacts');
