import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({children}) => {
	const { user } = useSelector((state) => state.auth);
	return user && user.isAdmin ? children : <Navigate to="/signin" />;
}

export default AdminRoute