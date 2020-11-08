import React, { useEffect } from "react";

import { Button, Table, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { connect, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  listProducts,
  deleteProdcut,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../actions/types";
const ProductListScreen = ({
  history,
  successCreate,
  loadingCreate,
  errorCreate,
  createdProduct,
  match,
  listProducts,
  createProduct,
  deleteProdcut,
  products,
  loading,
  error,
  userInfo,
  deleteSuccess,
  deleteLoading,
  deleteError,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo && !userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      listProducts();
    }

    //eslint-disable-next-line
  }, [
    listProducts,
    history,
    userInfo,
    deleteSuccess,
    successCreate,
    createProduct,
  ]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      deleteProdcut(id);
    }
  };

  const createProductHandler = () => {
    createProduct();
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            {" "}
            <i className="fas fa-plus" /> Create Product{" "}
          </Button>
        </Col>
      </Row>
      {deleteLoading ? (
        <Loader />
      ) : (
        deleteError && <Message variant="danger">{deleteError}</Message>
      )}
      {loadingCreate ? (
        <Loader />
      ) : (
        errorCreate && <Message variant="danger">{errorCreate}</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>&#x20B9; {product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button className="btn-sm" variant="light">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  products: state.productList.products,
  loading: state.productList.loading,
  error: state.productList.error,
  userInfo: state.userLogin.userInfo,
  deleteSuccess: state.productDelete.success,
  deleteLoading: state.productDelete.loading,
  deleteError: state.productDelete.error,
  successCreate: state.productCreate.success,
  createdProduct: state.productCreate.product,
  loadingCreate: state.productCreate.loading,
  errorCreate: state.productCreate.error,
});

export default connect(mapStateToProps, {
  listProducts,
  deleteProdcut,
  createProduct,
})(ProductListScreen);
