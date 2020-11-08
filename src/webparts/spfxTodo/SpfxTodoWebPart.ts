import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpfxTodoWebPartStrings';
import SpfxTodo from './components/SpfxTodo';
import { ISpfxTodoProps } from './components/ISpfxTodoProps';

export interface ISpfxTodoWebPartProps {
  todoListName: string;
}

export default class SpfxTodoWebPart extends BaseClientSideWebPart<ISpfxTodoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpfxTodoProps> = React.createElement(
      SpfxTodo,
      {
        todoListName: this.properties.todoListName,
        webPartContext: this.context,  
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('todoListName', {
                  label: strings.TodoListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
