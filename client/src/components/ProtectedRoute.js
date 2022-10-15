import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({children}) => {
	const { user } = useSelector((state) => state.auth);
	return user ? children : <Navigate to="/signin" />;
}

export default ProtectedRoute