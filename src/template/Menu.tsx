import React from 'react';

import { Menu as AntdMenu } from 'antd';
import { Link } from 'react-router-dom';

const Menu = (props) => {
  const activePath = window.location.pathname.slice(1);

  return (
    <AntdMenu
      mode="horizontal"
      selectedKeys={[activePath]}
    >
      <AntdMenu.SubMenu key="polls-submenu" title="Enquetes">
        <AntdMenu.Item key="polls">
          <Link to="/polls" >Ver Tudo</Link>
        </AntdMenu.Item>
        <AntdMenu.Item key="mypolls">
          <Link to="/mypolls">Minhas Enquetes</Link>
        </AntdMenu.Item>
      </AntdMenu.SubMenu>
      <AntdMenu.SubMenu key="workshops-submenu" title="Workshops">
        <AntdMenu.Item key="workshops">
          <Link to="/workshops">Ver Tudo</Link>
        </AntdMenu.Item>
        <AntdMenu.Item key="myworkshops">
          <Link to="/myworkshops">Meus Workshops</Link>
        </AntdMenu.Item>
      </AntdMenu.SubMenu>
    </AntdMenu>
  );
};

export default Menu;
