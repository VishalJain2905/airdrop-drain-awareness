import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import EthereumAttacks from './pages/EthereumAttacks';
import SolanaAttacks from './pages/SolanaAttacks';
import Prevention from './pages/Prevention';
import AttackDetails from './pages/AttackDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/ethereum',
        element: <EthereumAttacks />,
      },
      {
        path: '/solana',
        element: <SolanaAttacks />,
      },
      {
        path: '/prevention',
        element: <Prevention />,
      },
      {
        path: '/attack/:network/:type',
        element: <AttackDetails />,
      },
    ],
  },
]);