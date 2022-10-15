import React, { useEffect } from 'react'
import { useSelector, useDispatch} from "react-redux";
import { getMyOrders } from 'features/cartSlice';
import { Button } from "react-bootstrap";
import Loading from "components/Loading";
import ErrorMessageBox from "components/ErrorMessageBox";
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
	const { myOrders, error } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(getMyOrders())
	}, [dispatch])

  return (
	<div>
		<h1>Order History</h1>
      {myOrders?.status === 'pending' ? (
        <Loading></Loading>
      ) : error ? (
        <ErrorMessageBox variant="danger">{error}</ErrorMessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default OrderHistory