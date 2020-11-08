import * as React from 'react';

import { IPageProps } from './IPageProps';

class Help extends React.Component<IPageProps> {

  constructor(props: IPageProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <p>Help</p>
      </div>
    );
  }

}
export default Help;