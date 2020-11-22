import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import { connect } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

//import products from "../products";
const HomeScreen = ({ listProducts, products, error, loading, match }) => {
  const keyword = match.params.keyword;
  useEffect(() => {
    listProducts(keyword);
  }, [listProducts, keyword]);
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  products: state.productList.products,
  loading: state.productList.loading,
  error: state.productList.error,
});

export default connect(mapStateToProps, { listProducts })(HomeScreen);
