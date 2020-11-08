import * as React from 'react';
import styles from './SpfxTodo.module.scss';
import { ISpfxTodoProps } from './ISpfxTodoProps';
import { escape } from '@microsoft/sp-lodash-subset';

import SpApp from './SpApp';

export default class SpfxTodo extends React.Component<ISpfxTodoProps, {}> {
  public render(): React.ReactElement<ISpfxTodoProps> {
    return (
      <>
        <SpApp {...this.props}/>
      </>
    );
  }
}
