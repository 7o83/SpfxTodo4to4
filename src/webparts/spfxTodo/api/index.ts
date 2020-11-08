import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import * as util from '../components/util';

import { ITodoItem } from '../components/molecules/ITodoItem';

/********** 画面から呼び出し用関数 **********/
/********** TodoList GET **********/
const getTodoListOptions = "?$select=ID,Title,LimitDate,Note,Modified,Status&$filter=Status eq 'Run'&$orderby=LimitDate asc";

export const GetTodoListItems =
	async (setState: any, targetListName: string, context: WebPartContext) => {
		setState({ loading: true });
		const todoListItems: Array<Object> = await GetListItems(context, targetListName, getTodoListOptions);
		setState({ loading: false, todoListItems });
	};

/********** TodoDetail GET **********/
export const GetTodoListItemByID =
	async (setState: any, targetListName: string, context: WebPartContext, ID: string) => {

		setState({ loading: true });
		const todoListItem: Object = await GetListItemByID(context, targetListName, ID);
		const todoItem: ITodoItem = util.ObjectMerge({ Title: "", LimitDate: null, Note: "", Status: "", ID: "", Created: null, Modified: null }, todoListItem);
		setState({ loading: false, iTodoItem: todoItem });
	};

/********** TodoDetail POST **********/
export const CreateTodoListItem =
	async (setState: any, targetListName: string, context: WebPartContext, todoItem: ITodoItem) => {

		setState({ loading: true });
		const createTodoItem: ITodoItem = util.ObjectMerge({ Title: "", LimitDate: null, Note: '', Status: '' }, todoItem);
		createTodoItem.Status = "Run";
		const res = await CreateListItem(context, targetListName, createTodoItem);
	};

export const UpdateTodoListItem =
	async (setState: any, targetListName: string, context: WebPartContext, todoItem: ITodoItem) => {

		setState({ loading: true });
		const updateTodoItem: ITodoItem = util.ObjectMerge({ Title: "", LimitDate: null, Note: '', Status: '' }, todoItem);
		const res = await UpdateListItem(context, targetListName, todoItem.ID, updateTodoItem);
	};

export const CompleteTodoListItem =
	async (setState: any, targetListName: string, context: WebPartContext, todoItem: ITodoItem) => {

		setState({ loading: true });
		const updateTodoItem: ITodoItem = util.ObjectMerge({ Title: "", LimitDate: null, Note: '', Status: '' }, todoItem);
		updateTodoItem.Status = "Done";
		const res = await UpdateListItem(context, targetListName, todoItem.ID, updateTodoItem);
	};

export const DeleteTodoListItem =
	async (setState: any, targetListName: string, context: WebPartContext, todoItem: ITodoItem) => {

		setState({ loading: true });
		const res = await DeleteListItem(context, targetListName, todoItem.ID);
	};

/********** リストアイテムの操作用共通関数 **********/
const defHeaders: HeadersInit = { "Content-type": "application/json", "Accept": "application/json" };
const updHeaders: HeadersInit = { "Content-type": "application/json", "Accept": "application/json", "X-HTTP-Method": "MERGE", "If-Match": "*" };
const delHeaders: HeadersInit = { "Content-type": "application/json", "Accept": "application/json", "X-HTTP-Method": "DELETE", "If-Match": "*" };

/********** 検索 **********/
const GetListItems =
	async (context: WebPartContext, listName: string, options: string) => {

		if (!options) {
			options = "";
		}
		const restUri: string = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listName}')/Items${options}`;
		const res: SPHttpClientResponse = await SpRestGet(context, restUri);
		const resJson: any = await res.json();
		const resJsonArray: Array<Object> = resJson.value;
		return resJsonArray;
	};

const GetListItemByID =
	async (context: WebPartContext, listName: string, ID: string) => {

		const restUri: string = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listName}')/Items(${ID})`;
		const res: SPHttpClientResponse = await SpRestGet(context, restUri);
		const resJson: any = await res.json();
		return resJson;
	};

/********** 作成 **********/
const CreateListItem = async (context: WebPartContext, listName: string, dataJson: Object) => {
	const restUri: string = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listName}')/Items`;
	const options: ISPHttpClientOptions = {
		body: JSON.stringify(dataJson),
		headers: defHeaders
	};
	const res: SPHttpClientResponse = await SpRestPost(context, restUri, options);
	const resJson: any = await res.json();
	return resJson;
};

/********** 更新 **********/
const UpdateListItem = async (context: WebPartContext, listName: string, ID: string, dataJson: Object) => {
	const restUri: string = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listName}')/Items(${ID})`;
	const options: ISPHttpClientOptions = {
		body: JSON.stringify(dataJson),
		headers: updHeaders
	};
	const res: SPHttpClientResponse = await SpRestPost(context, restUri, options);
	return res;
};

/********** 削除 **********/
const DeleteListItem = async (context: WebPartContext, listName: string, ID: string) => {
	const restUri: string = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listName}')/Items(${ID})`;
	const options: ISPHttpClientOptions = {
		headers: delHeaders
	};
	const res: SPHttpClientResponse = await SpRestPost(context, restUri, options);
	return res;
};

/********** Spへのアクセス用共通関数 **********/
/********** GET Request **********/
const SpRestGet =
	async (context: WebPartContext, RestUri: string): Promise<SPHttpClientResponse> => {

		const res: SPHttpClientResponse = await context.spHttpClient.get(RestUri, SPHttpClient.configurations.v1);
		//エラーチェックは外部サイトが詳しいので省きます
		return res;
	};

/********** POST Request **********/
const SpRestPost =
	async (context: WebPartContext, RestUri: string, options: ISPHttpClientOptions): Promise<SPHttpClientResponse> => {

		const res: SPHttpClientResponse = await context.spHttpClient.post(RestUri, SPHttpClient.configurations.v1, options);
		//エラーチェックは外部サイトが詳しいので省きます
		return res;
	};