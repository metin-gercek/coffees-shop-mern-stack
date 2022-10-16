import { Row, Col } from "react-bootstrap";
import Product from "components/Product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productsFetch } from "../features/productsSlice";
import { Helmet } from "react-helmet-async";
import Loading from "components/Loading";
import ErrorMessageBox from "components/ErrorMessageBox";
import { Slide } from "components/Slide";

const Home = () => {
  const { products, error, status } = useSelector((state) => state.products);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productsFetch());
  }, [dispatch]);

  return (
    <div>
      <Helmet>
        <title>Coffees</title>
      </Helmet>
      <div className="products">
        {status === "pending" ? (
          <Loading />
        ) : error ? (
          <ErrorMessageBox variant="danger">{error}</ErrorMessageBox>
        ) : (
         
            
            <Row>
			<Slide />
              {products?.map((product) => (
                <Col key={product._id} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product>
                </Col>
              ))}
            </Row>
        
        )}
      </div>
    </div>
  );
};

export default Home;
