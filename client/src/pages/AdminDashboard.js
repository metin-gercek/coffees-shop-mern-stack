import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDashboardSummary } from "features/cartSlice";

import Loading from "components/Loading";
import ErrorMessageBox from "components/ErrorMessageBox";
import { Row, Col, Card } from "react-bootstrap";
import Chart from "react-google-charts";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDashboardSummary());
  }, [dispatch]);

  const { summary, error } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  

  return (
    <div>
      <h1>Dashboard</h1>
      {summary.status === "pending" ? (
        <Loading />
      ) : error ? (
        <ErrorMessageBox variant="danger">{error}</ErrorMessageBox>
      ) : (
        <>
          <Row>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.users && summary.users[0] ? summary.users[0].numUsers : 0}
                  </Card.Title>
                  <Card.Text> Users</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {products ? products.length : 0}
                  </Card.Title>
                  <Card.Text> Products</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.orders && summary.users[0] ? summary.orders[0].numOrders : 0}
                  </Card.Title>
                  <Card.Text> Orders</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    € {summary.orders && summary.users[0] ? summary.orders[0].totalSales.toFixed(2) : 0}
                  </Card.Title>
                  <Card.Text> Total Income</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Chart
              width="100%"
              height="400px"
              chartType="ColumnChart"
              loader={<div>Loading Chart...</div>}
              data={[
                ["Date", "Sales"],
                ...summary.dailyOrders.map((x) => [x._id, x.sales]),
              ]}
            ></Chart>
          </Row>
          <Row>
            <Chart
              width="100%"
              height="400px"
              chartType="PieChart"
              loader={<div>Loading Chart...</div>}
              data={[
                ["Category", "Products"],
                ...summary.productCategories.map((x) => [x._id, x.count]),
              ]}
            ></Chart>
          </Row>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
