import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function NavBarWithActions({ activeAdding, handleSearch }) {
  return (
    <Navbar className="bg-body-tertiary justify-content-center">
      <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search by brand,model.."
              className=" mr-sm-2"
              onChange={handleSearch}
            />
          </Col>
        </Row>
      </Form>
      <Form inline>
        <InputGroup>
          <Button
            style={{
              backgroundColor: "#001",
              marginLeft: "50px",
            }}
            onClick={() => activeAdding && activeAdding()}
          >
            Add new Car
          </Button>
        </InputGroup>
      </Form>
    </Navbar>
  );
}

export default NavBarWithActions;
