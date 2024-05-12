import './scss/styles.scss';

import { Presenter } from './components/Presenter';
import { Model } from './components/Model';
import { Api } from './components/base/api';
import { API_URL } from './utils/constants';
import { ApiResponse, IItem } from './types';
import { Page } from './components/Page';
import {ensureElement} from './utils/utils';
import { Card } from './components/Card';

const model = new Model();
const api = new Api(API_URL);

const htmlPage = ensureElement<HTMLElement>('.page');

const page = new Page(htmlPage);

api
	.get('/product')
	.then((res: ApiResponse) => {
		model.items = res.items;
	})
	.catch((err) => console.log(err));

const presenter = new Presenter(model, page, Card);
