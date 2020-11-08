import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISpAppProps {
  todoListName: string;
  webPartContext: WebPartContext;
}