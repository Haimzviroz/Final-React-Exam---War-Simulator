import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/Register';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App: React.FC = () => (
  <Provider store={store}>
	<BrowserRouter>
		<Routes>
			<Route path="/register" element={<Register />} />
			<Route path="/" element={<Login />} />
			{/* <Route path="users/:id" element={<Users />} /> */}
		</Routes>
	</BrowserRouter>
  </Provider>
);
export default App