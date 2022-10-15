import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Rating from "./Rating";
import { useDispatch} from "react-redux";
import { addToCart } from "features/cartSlice";

const Product = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  const handleAddtoCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <Card className="product">
      <Link to={`/product/${product._id}`}>
        <Card.Img 
          src={product.image}
          className="card-img-top pt-3"
          alt={product.name}
        />
      </Link>
      <Card.Body className="product-info text-center">
        <Link className="card-title" to={`/product/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <strong>
          <Card.Text>€ {product.price}</Card.Text>
        </strong>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled onClick={() => handleAddtoCart(product)}>Out of stock</Button>
        ) : (
          <Button  onClick={() => handleAddtoCart(product)}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
