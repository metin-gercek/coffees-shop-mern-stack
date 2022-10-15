import { getAllUsers, adminRemoveUser } from "features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ErrorMessageBox from "components/ErrorMessageBox";
import Loading from "components/Loading";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";


const UserLists = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, isError, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = (user) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(adminRemoveUser(user));
    }
  };


  return (
    <div>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <h1>Users</h1>
      {isLoading ? (
        <Loading></Loading>
      ) : isError ? (
        <ErrorMessageBox variant="danger">{isError}</ErrorMessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>BANNED</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "YES" : "NO"}</td>
                <td>{user.isBanned ? "YES" : "NO"}</td>
                <td>
                  <Button
                    variant="light"
                    onClick={() => navigate(`/admin/user/${user._id}`)}
                  >
                    <i className="fas fa-wrench"></i>
                  </Button>
                </td>
				<td>
                    <Button
                      variant="light"
                      onClick={() => handleDelete(user)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserLists;
