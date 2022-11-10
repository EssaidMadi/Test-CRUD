import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAction, updateProductAction } from "../../actions/productsActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";

function SingleProduct({ match, history }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [warranty_years, setWarranty_years] = useState("");
  const [available, setAvailable] = useState("");

  const dispatch = useDispatch();

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading, error } = productUpdate;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete } = productDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProductAction(id));
    }
    history.push("/myProducts");
  };

  useEffect(() => {
    
    const fetching = async () => {

      const config = {
        headers: {
          "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjMzU2ODJlZjg4YWY3ZTljMTViNzIiLCJpYXQiOjE2NjgwNjQxMjl9.fP_V2GsdMMG_7Qit1iEFi-IE0YjWzbl8paYRt7WrBIY",
        },
      };
      const { data } = await axios.get(`/api/phone/${match.params.id}`, config);

      setName(data.name);
      setType(data.type);
      setPrice(data.price);
      setRating(data.rating);
      setWarranty_years(data.warranty_years);
      setAvailable(data.available);
    };

    fetching();
  }, [match.params.id]);

  const resetHandler = () => {
    setName("");
    setType("");
    setPrice("");
    setRating("");
    setWarranty_years("");
    setAvailable("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateProductAction(match.params.id, name, type, price, rating, warranty_years, available));
    if (!name || !type || !price || !rating || !warranty_years || !available) return;

    resetHandler();
    history.push("/myProducts");
  };

  return (
    <MainScreen title="Edit Product">
      <Card>
        <Card.Header>Edit your Product</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="Enter the name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="textarea"
                value={type}
                placeholder="Enter the type"
                rows={4}
                onChange={(e) => setType(e.target.value)}
              />
            </Form.Group>
            {type && (
              <Card>
                <Card.Header>products Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{type}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>price</Form.Label>
              <Form.Control
                type="content"
                value={price}
                placeholder="Enter the price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>rating</Form.Label>
              <Form.Control
                type="content"
                value={rating}
                placeholder="Enter the Rating"
                onChange={(e) => setRating(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>warranty years</Form.Label>
              <Form.Control
                type="content"
                value={warranty_years}
                placeholder="Enter the warranty years"
                onChange={(e) => setWarranty_years(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>available</Form.Label>
              <Form.Control
                type="content"
                value={available}
                placeholder="Enter the availabelity"
                onChange={(e) => setAvailable(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Product
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete product
            </Button>
          </Form>
        </Card.Body>

      </Card>
    </MainScreen>
  );
}

export default SingleProduct;
