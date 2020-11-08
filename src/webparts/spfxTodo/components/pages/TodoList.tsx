import * as React from 'react';

import {
  PrimaryButton, Stack, IStackTokens, DetailsList, IColumn, CheckboxVisibility
} from 'office-ui-fabric-react';

import Loading from '../molecules/Loading';
import * as api from '../../api';
import * as util from '../util';

import { IPageProps } from './IPageProps';

interface State {
  loading: boolean;
  todoColumns: IColumn[];
  todoListItems: Array<Object>;
}

class TodoList extends React.Component<IPageProps, State> {

  constructor(props: IPageProps) {
    super(props);
    const todoColumns: IColumn[] = [
      {
        key: 'col0',
        name: 'ID',
        fieldName: 'ID',
        minWidth: 20,
        maxWidth: 20,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'col1',
        name: '件名',
        fieldName: 'Title',
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'col2',
        name: '期限',
        fieldName: 'LimitDate',
        minWidth: 75,
        maxWidth: 75,
        isResizable: true,
        data: 'number',
        isPadded: true,
        isSorted: true,
        isSortedDescending: false,
        onRender: (item) => {
          return <span>{util.DateFormatJa(item.LimitDate)}</span>;
        },
      },
      {
        key: 'col3',
        name: 'メモ',
        fieldName: 'Note',
        minWidth: 200,
        maxWidth: 200,
        isResizable: true,
        data: 'string',
        isPadded: true,
        isMultiline: true
      },
      {
        key: 'col4',
        name: '最終更新',
        fieldName: 'Modified',
        minWidth: 75,
        maxWidth: 75,
        isResizable: true,
        data: 'string',
        isPadded: true,
        onRender: (item) => {
          return <span>{util.DateFormatJa(item.Modified)}</span>;
        },
      }
    ];

    this.state = {
      loading: false, todoColumns, todoListItems: []
    };
  }

  private GetTodoListItems = async () =>
    api.GetTodoListItems(this.setState.bind(this), this.props.todoListName, this.props.webPartContext)

  public componentDidMount() {
    this.GetTodoListItems();
  }

  public render() {
    const stackTokens: IStackTokens = { childrenGap: 5 };
    const { routeProps } = this.props;
    const { history } = routeProps;
    const { loading, todoColumns, todoListItems } = this.state;
    return (
      <div>
        <Stack tokens={stackTokens}>
          <Stack.Item align='end'>
            <PrimaryButton text='Reload' onClick={this.GetTodoListItems} />
          </Stack.Item>
          <Stack.Item align='auto'>
            {loading ? (
              <Loading />
            ) : (
                todoListItems.length > 0 ? (
                  <DetailsList items={todoListItems} columns={todoColumns} checkboxVisibility={CheckboxVisibility.hidden}
                    onActiveItemChanged={(item, i, e) =>
                      history.push({ pathname: "/TodoDetail/" + item.ID })} />
                ) : (
                    <><p>Good work! No more Todos.</p></>
                  )
              )}
          </Stack.Item>
        </Stack>
      </div>
    );
  }

}
export default TodoList;