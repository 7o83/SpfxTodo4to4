import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISpfxTodoProps {
  todoListName: string;
  webPartContext: WebPartContext;
}