import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const API = process.env.REACT_APP_API_URL;

function SnacksNewForm() {
  let navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const addSnack = (newSnack) => {
    axios
      .post(`${API}/snacks`, newSnack)
      .then(() => navigate(`snacks`))
      .catch((error) => console.log(error));
  };

  const [snack, setSnack] = useState({
    name: "",
    fiber: "",
    protein: "",
    added_sugar: "",
    is_healthy: null,
    image: "",
  });

  const handleTextChange = (e) => {
    setSnack({ ...snack, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!e.target.checkValidity()){
      e.stopPropagation();
    }
    if (e.target.checkValidity()){
      addSnack(snack);
    }
    setValidated(true)
  };

  return (
    <div>
      <section>
        <h3> Snack Health is determined by: </h3>
        <ul>
          <li>Protein is above 5</li>
          <li>Or Fiber is above 5</li>
          <li>and Sugar is less than 5</li>
        </ul>
      </section>
      <h1>Add New Snack: </h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name: </Form.Label>
          <Form.Control
            required
            id="snack_name"
            value={snack.name}
            type="text"
            onChange={handleTextChange}
            placeholder="Name"
          />
          <Form.Control.Feedback type="invalid">
            Please add a snack name
          </Form.Control.Feedback>
          <Form.Control.Feedback type="valid">
            Looks Good!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Fiber:</Form.Label>
          <Form.Control
            id="fiber"
            type="number"
            value={snack.fiber}
            placeholder="Fiber"
            onChange={handleTextChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Protein:</Form.Label>
          <Form.Control
            id="protein"
            type="number"
            value={snack.protein}
            placeholder="Protein"
            onChange={handleTextChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Added Sugar:</Form.Label>
          <Form.Control
            id="added_sugar"
            type="number"
            value={snack.added_sugar}
            placeholder="Added Sugar"
            onChange={handleTextChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image:</Form.Label>
          <Form.Control
            id="image"
            type="text"
            value={snack.image}
            placeholder="http://"
            onChange={handleTextChange}
          />
        </Form.Group>
        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default SnacksNewForm;
