import * as React from 'react';

import { Spinner, SpinnerSize } from 'office-ui-fabric-react';

const Loading = () => (
  <div>
    <Spinner size={SpinnerSize.large} label="loading..." ariaLive="assertive" labelPosition="top" />
  </div>
);
export default Loading;