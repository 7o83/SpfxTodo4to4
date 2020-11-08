import * as React from 'react';

import { Stack, IStackTokens } from 'office-ui-fabric-react';

import Loading from '../molecules/Loading';
import * as api from '../../api';

import TodoItemForm from '../molecules/TodoItemForm';

import { IPageProps } from './IPageProps';
import { ITodoItem } from '../molecules/ITodoItem';

interface State {
  loading: boolean;
  formType: "new" | "edit";
  iTodoItem: ITodoItem;
}

class TodoDetail extends React.Component<IPageProps, State> {

  constructor(props: IPageProps) {
    super(props);
    this.state = {
      loading: false, formType: "new",
      iTodoItem: { Title: "", LimitDate: new Date().toJSON(), Note: "", Status: "", ID: "", Created: null, Modified: null }
    };
  }

  private CreateTodoListItem = async (todoItem: ITodoItem) => {
    await api.CreateTodoListItem(this.setState.bind(this), this.props.todoListName, this.props.webPartContext, todoItem);
    this.props.routeProps.history.push({ pathname: "/" });
  }
  private UpdateTodoListItem = async (todoItem: ITodoItem) => {
    await api.UpdateTodoListItem(this.setState.bind(this), this.props.todoListName, this.props.webPartContext, todoItem);
    this.props.routeProps.history.push({ pathname: "/" });
  }
  private CompleteTodoListItem = async (todoItem: ITodoItem) => {
    await api.CompleteTodoListItem(this.setState.bind(this), this.props.todoListName, this.props.webPartContext, todoItem);
    this.props.routeProps.history.push({ pathname: "/" });
  }
  private DeleteTodoListItem = async (todoItem: ITodoItem) => {
    await api.DeleteTodoListItem(this.setState.bind(this), this.props.todoListName, this.props.webPartContext, todoItem);
    this.props.routeProps.history.push({ pathname: "/" });
  }

  private GetTodoListItemByID = async () =>
    await api.GetTodoListItemByID(this.setState.bind(this), this.props.todoListName, this.props.webPartContext, this.props.routeProps.match.params.ID)

  private HistoryPushTodoList = () => {
    this.props.routeProps.history.push({ pathname: "/" });
  }

  public render() {
    const stackTokens: IStackTokens = { childrenGap: 10 };
    const { routeProps } = this.props;
    const { match } = routeProps;
    const { loading, iTodoItem } = this.state;
    return (
      <div>
        <Stack tokens={stackTokens}>
          <Stack.Item align="auto">
            {loading ? (
              <Loading />
            ) : (
                <TodoItemForm itemID={match.params.ID || null} formType={match.params.ID ? "edit" : "new"} iTodoItem={iTodoItem}
                  CreateTodoListItem={this.CreateTodoListItem} UpdateTodoListItem={this.UpdateTodoListItem} 
                  CompleteTodoListItem={this.CompleteTodoListItem} DeleteTodoListItem={this.DeleteTodoListItem} 
                  GetTodoListItemByID={this.GetTodoListItemByID} HistoryPushTodoList={this.HistoryPushTodoList} />
              )}
          </Stack.Item>
        </Stack>
      </div>
    );
  }
}
export default TodoDetail;