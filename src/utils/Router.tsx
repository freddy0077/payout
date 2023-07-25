import { createBrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import PayoutWizard from '../containers/PayoutWizard';
import MessagePage from '../containers/MessagePage';
import TicketWinners from '../containers/TicketWinners';
import Login from '../components/Auth/Login';
import PrivateRoute from '../components/PrivateRoute';


// const isAuthenticated = true;
export const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/',
        // element: <PrivateRoute isAuthenticated={isAuthenticated} />,
        children: [
          {
            path: '',
            element: <PayoutWizard />,
          },
          {
            path: 'message',
            element: <MessagePage />,
          },
          {
            path: 'ticket',
            element: <TicketWinners />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);
