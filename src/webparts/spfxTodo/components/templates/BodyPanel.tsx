import * as React from 'react';
import styles from './Panel.module.scss';  

const BodyPanel = ({ children }) => (
  <div className={styles.body_panel}>
    {children}
  </div>
);
export default BodyPanel;