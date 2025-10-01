import { RouterProvider } from 'react-router-dom';
import { DrainProvider } from './components/DrainContext';
import { router } from './router';

export default function App() {
  return (
    <DrainProvider>
      <RouterProvider router={router} />
    </DrainProvider>
  );
}