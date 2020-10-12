import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
// import products from "../products";

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState(null);
  async function fetchProduct() {
    try {
      const res = await axios.get("/api/products/" + match.params.id);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {product && (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews}reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price:{product.price}&#x20B9;</ListGroup.Item>
              <ListGroup.Item>Description:{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>{product.price}&#x20B9;</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock > 0 ? false : true}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
