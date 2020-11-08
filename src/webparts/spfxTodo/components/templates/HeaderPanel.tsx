import * as React from 'react';
import styles from './Panel.module.scss'; 

const HeaderPanel = ({ children }) => (
  <div className={styles.header_panel}>
    {children}
  </div>
);
export default HeaderPanel;  