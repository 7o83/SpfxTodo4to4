import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ITodoItem } from './ITodoItem';

export interface ITodoItemFormProps {
  itemID: string;
  formType: "new" | "edit";
  iTodoItem: ITodoItem;
  CreateTodoListItem: Function;
  UpdateTodoListItem: Function;
  CompleteTodoListItem: Function;
  DeleteTodoListItem: Function;
  GetTodoListItemByID: Function;
  HistoryPushTodoList: Function;
}
