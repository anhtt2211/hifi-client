import {
  EditOutlined,
  FormOutlined,
  HeartOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import axios from 'axios';
import { NO_AUTH_PATHS } from 'constant';
import { firebaseAuth } from 'firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import React from 'react';
import { useAppDispatch } from 'redux/hooks';
import { authActions } from 'redux/reducers/authSlice';
import routeHelper from 'utils/routeHelper';
import Cookies from 'universal-cookie';

const Content = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
      await signOut(firebaseAuth);
      if (
        !(NO_AUTH_PATHS.includes(router.pathname) || routeHelper.matchPublicPaths(router.pathname))
      ) {
        router.replace('/auth/login' + '?redirect_url=' + router.pathname);
      }
      dispatch(authActions.logout());
      const cookies = new Cookies();
      cookies.remove('accessToken', { path: '/' });
    } catch (error) {
      console.log('handleLogout Error: ', error);
    }
  };

  const navigate = (route: string) => {
    router.push(route);
  };

  const contents = [
    {
      key: '1',
      icon: <EditOutlined />,
      content: 'Profile',
      onClick: () => navigate('/profile'),
    },
    {
      key: '2',
      icon: <FormOutlined />,
      content: 'My Applications',
      onClick: () => navigate('/user/applications'),
    },
    {
      key: '3',
      icon: <HeartOutlined />,
      content: 'My Favorite Posts',
      onClick: () => navigate('/user/favorite-posts'),
    },
    {
      key: '4',
      icon: <SettingOutlined />,
      content: 'Account Settings',
      onClick: () => navigate('/settings'),
    },
    {
      key: '5',
      icon: <LogoutOutlined />,
      content: 'Log Out',
      onClick: handleLogout,
    },
  ];
  const renderMenu = () => {
    return contents.map((content) => {
      return (
        <Menu.Item
          style={{ padding: '0', fontSize: '14px' }}
          key={content.key}
          onClick={content.onClick}
          icon={content.icon}
        >
          {content.content}
        </Menu.Item>
      );
    });
  };
  const menuRendered = renderMenu();
  return (
    <div>
      <Menu style={{ width: 180 }}>{menuRendered}</Menu>
    </div>
  );
};

export default Content;
