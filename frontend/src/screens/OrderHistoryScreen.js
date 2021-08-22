import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen(props) {
  const userMineList = useSelector(state => state.userMineList);
  const { loading, error, orders } = userMineList;
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    userInfo ? dispatch(listOrderMine()) : props.history.push('/login');
  }, [dispatch, props.history]);

  return (
    <>
      <h1>Mis pedidos</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>FECHA</th>
              <th>TOTAL</th>
              <th>PAGADO</th>
              <th>ENTREGADO</th>
              <th>IDENTIFICADOR</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr
                key={order._id}
                // TODO: Mouse hover clikable, add visual UI
                onClick={() => {
                  props.history.push(`/order/${order._id}`);
                }}
              >
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}€</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.toLocaleDateString()
                    : 'No'}
                </td>
                <td>{order._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
