import * as React from 'react';
import styles from './SpApp.module.scss';

import { Route, NavLink, Switch, HashRouter } from 'react-router-dom';
import { DefaultButton, Stack, IStackTokens, Separator } from 'office-ui-fabric-react';

import HeaderPanel from './templates/HeaderPanel';
import BodyPanel from './templates/BodyPanel';

import TodoList from './pages/TodoList';
import TodoDetail from './pages/TodoDetail';
import Help from './pages/Help';

import { ISpAppProps } from './ISpAppProps';

class SpApp extends React.Component<ISpAppProps> {

  constructor(props: ISpAppProps) {
    super(props);
  }

  public render() {
    const stackTokens: IStackTokens = { childrenGap: 5 };
    const { todoListName, webPartContext } = this.props;
    return (
      <div className={styles.spapp}>
        <div className={styles.container}>
          <h1>SPFx Todo App</h1>
          <HashRouter>
            <Stack tokens={stackTokens}>
              <HeaderPanel>
                <nav>
                  <Stack horizontal tokens={stackTokens}>
                    <NavLink exact to={'/'} activeStyle={{ opacity: 0.6 }}>
                      <DefaultButton text='TodoList' />
                    </NavLink>
                    <NavLink to={'/TodoDetail'} activeStyle={{ opacity: 0.6 }}>
                      <DefaultButton text='TodoDetail' />
                    </NavLink>
                    <NavLink to={'/Help'} activeStyle={{ opacity: 0.6 }}>
                      <DefaultButton text='Help' />
                    </NavLink>
                  </Stack>
                </nav>
                <Separator />
              </HeaderPanel>
              <BodyPanel>
                <Switch>
                  <Route sensitive exact path='/' component={(props) => <TodoList todoListName={todoListName}
                    webPartContext={webPartContext} routeProps={props} />} />
                  <Route sensitive exact path='/TodoDetail' component={(props) => <TodoDetail todoListName={todoListName} 
                    webPartContext={webPartContext} routeProps={props}/>} />
                  <Route path='/TodoDetail/:ID' component={(props) => <TodoDetail todoListName={todoListName} 
                    webPartContext={webPartContext} routeProps={props}/>} />
                  <Route sensitive exact path='/Help' component={(props) => <Help todoListName={todoListName}
                    webPartContext={webPartContext} routeProps={props} />} />
                </Switch>
              </BodyPanel>
            </Stack>
          </HashRouter>
        </div>
      </div>
    );
  }
}
export default SpApp;