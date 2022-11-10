import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createProductAction } from "../../actions/productsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateProduct({ history }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [warranty_years, setWarranty_years] = useState("");
  const [available, setAvailable] = useState("");

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  console.log(product);

  const resetHandler = () => {
    setName("");
    setType("");
    setPrice("");
    setRating("");
    setWarranty_years("");
    setAvailable("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductAction(name, type, price, rating, warranty_years, available));
    if (!name || !type || !price || !rating || !warranty_years || !available) return;

    resetHandler();
    history.push("/myProducts");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create a Product">
      <Card>
        <Card.Header>Create a new Product</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
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
            <Button type="submit" variant="primary">
              Create Product
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateProduct;
