import { WebPartContext } from '@microsoft/sp-webpart-base';
import { RouteComponentProps } from 'react-router';

export interface IPageProps {
  todoListName: string;
  webPartContext: WebPartContext;
  routeProps: RouteComponentProps<
    { ID: string }
  >;
}
