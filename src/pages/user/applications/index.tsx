import { Menu, Space } from 'antd';
import Image from 'next/image';
import React from 'react';
import { CalculatorIcon } from '@heroicons/react/solid';
import StatusSideBar from 'components/application/StatusSideBar';
import ApplicationList from 'components/application/ApplicationList';
type Props = {};

const ApplicationsPage = (props: Props) => {
  return (
    <div className='p-8'>
      <h1>My Applications</h1>
      <div className='flex min-h-screen max-h-32 bg-white rounded-md py-4'>
        <StatusSideBar />
        <ApplicationList />
      </div>
    </div>
  );
};

export default ApplicationsPage;
