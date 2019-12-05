import React from 'react';
import 'react-notifications/lib/notifications.css';
// @ts-ignore
import { NotificationContainer } from 'react-notifications';
import PaintPage from './components/PaintPage';
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <PaintPage /> <NotificationContainer />
    </>
  );
};

export default App;
