import * as React from 'react';

import {
  PrimaryButton, DefaultButton, Stack, IStackTokens, DatePicker, TextField, Separator
} from 'office-ui-fabric-react';

import * as util from '../util';

import { ITodoItemFormProps } from './ITodoItemFormProps';
import { ITodoItem } from './ITodoItem';


class TodoItemForm extends React.Component<ITodoItemFormProps, ITodoItem> {

  constructor(props: ITodoItemFormProps) {
    super(props);
    this.state = this.props.iTodoItem;
  }

  private CreateTodoListItem = async (e, itodoItem: ITodoItem) => {
    e.preventDefault();
    await this.props.CreateTodoListItem(itodoItem);
  }
  private UpdateTodoListItem = async (e, itodoItem: ITodoItem) => {
    e.preventDefault();
    await this.props.UpdateTodoListItem(itodoItem);
  }
  private CompleteTodoListItem = async (e, itodoItem: ITodoItem) => {
    e.preventDefault();
    await this.props.CompleteTodoListItem(itodoItem);
  }
  private DeleteTodoListItem = async (e, itodoItem: ITodoItem) => {
    e.preventDefault();
    await this.props.DeleteTodoListItem(itodoItem);
  }

  private GetTodoListItemByID = async () => this.props.GetTodoListItemByID();

  private HistoryPushTodoList = () => this.props.HistoryPushTodoList();

  public async componentDidMount() {
    if (this.props.formType == "edit" && !(this.state.ID)) {
      await this.GetTodoListItemByID();
    }
  }

  public render() {
    const stackTokens: IStackTokens = { childrenGap: 10 };
    const { formType } = this.props;
    const { Title, LimitDate, Note, ID, Created, Modified } = this.state;
    return (
      <div>
        <form>
          <Stack horizontal tokens={stackTokens}>
            <Stack.Item align="auto" grow={4}>
              <TextField label="件名" value={Title} onChange={(e, newVal) => this.setState({ Title: newVal })} />
            </Stack.Item>
            <Stack.Item align="auto" grow={2}>
              <DatePicker label="期限" value={new Date(LimitDate)}
                formatDate={(dispDate) => util.DateFormatJa(dispDate.toJSON())}
                onSelectDate={(newDate) => this.setState({ LimitDate: newDate.toJSON() })} />
            </Stack.Item>
          </Stack>
          <Stack horizontal tokens={stackTokens} >
            <Stack.Item align="auto" grow={6}>
              <TextField label="メモ" value={Note} multiline rows={6} resizable={false}
                onChange={(e, newVal) => this.setState({ Note: newVal })} />
            </Stack.Item>
          </Stack>
          <Separator />
          <Stack horizontal tokens={stackTokens} >
            <Stack.Item align="auto" grow={2}>
              <TextField label="ID" value={ID || "New"} borderless={true} readOnly={true} />
            </Stack.Item>
            <Stack.Item align="auto" grow={2}>
              <TextField label="作成日時" value={Created ? util.DateTimeFormatJa(Created) : "-"} borderless={true} readOnly={true} />
            </Stack.Item>
            <Stack.Item align="auto" grow={2}>
              <TextField label="更新日時" value={Modified ? util.DateTimeFormatJa(Modified) : "-"} borderless={true} readOnly={true} />
            </Stack.Item>
          </Stack>
          <Separator />
          <Stack tokens={stackTokens}>
            <Stack horizontal horizontalAlign="end" tokens={stackTokens}>
              <Stack.Item align="auto">
                <PrimaryButton type="submit" value="Create" onClick={(e) => this.CreateTodoListItem(e, this.state)} disabled={formType === "edit"} text="Create" />
              </Stack.Item>
              <Stack.Item align="auto">
                <PrimaryButton type="submit" value="Update" onClick={(e) => this.UpdateTodoListItem(e, this.state)} disabled={formType === "new"} text="Update" />
              </Stack.Item>
              <Stack.Item align="auto">
                <PrimaryButton type="submit" value="Complete" onClick={(e) => this.CompleteTodoListItem(e, this.state)} disabled={formType === "new"} text="Complete(Update)" />
              </Stack.Item>
              <Stack.Item align="auto">
                <PrimaryButton type="submit" value="Delete" onClick={(e) => this.DeleteTodoListItem(e, this.state)} disabled={formType === "new"} text="Delete" />
              </Stack.Item>
            </Stack>
            <Stack horizontal horizontalAlign="end" tokens={stackTokens}>
              <Stack.Item align="auto">
                <DefaultButton text="Back" onClick={this.HistoryPushTodoList} />
              </Stack.Item>
            </Stack>
          </Stack>
        </form>
      </div>
    );
  }
}
export default TodoItemForm;