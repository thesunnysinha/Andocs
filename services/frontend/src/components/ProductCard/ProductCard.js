import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { getToken } from "../../services/LocalStorageService";
import { useAddProductToCartMutation,useFetchCartQuery } from "../../services/userAuthApi";

const ProductCard = (props) => {
  const MAX_LENGTH = 40;
  const { access_token } = getToken();
  const [addProductToCart] = useAddProductToCartMutation();
  const { refetch: reFetchCart } = useFetchCartQuery(access_token);
  
  let { selling_price, discounted_price, title, discount_percent, product_id } =
    props.data;

  const handleAddToCart = (id) => {
    if (!access_token) {
      return window.location.replace("/profile");
    }
    addProductToCart({ id: id, access_token: access_token })
      .then((response) => {
        console.log(response);
        reFetchCart();
        // handle the successful response, for example, display a success message
      })
      .catch((error) => {
        console.log(error);
        // handle the error, for example, display an error message
      });
  };

  return (
    <Card className="p-0 overflow-hidden h-100 shadow">
      <Card.Body className="text-center">
        <Card.Title className="display-6">
          <span className="fs-5">
            Rs.
            {discounted_price}{" "}
            <small className="fw-light text-decoration-line-through">
              {selling_price}{" "}
            </small>
            <small style={{ color: "green" }} className="fw-dark">
              {discount_percent}% off
            </small>
          </span>
        </Card.Title>
        <Card.Title>
          <div>
            {title.length > MAX_LENGTH ? (
              <div>{`${title.substring(0, MAX_LENGTH)}...`}</div>
            ) : (
              <p>{title}</p>
            )}
          </div>
        </Card.Title>
      </Card.Body>
      <Button
        onClick={() => handleAddToCart(product_id)}
        className="w-100 rounded-0 "
        variant="success"
      >
        Add To Cart
      </Button>
    </Card>
  );
};

export default ProductCard;
