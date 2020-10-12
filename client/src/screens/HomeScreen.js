import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import axios from "../axios";
//import products from "../products";
const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  async function fetchProducts() {
    try {
      const response = await axios.get("/api/products");
      console.log(response);
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
