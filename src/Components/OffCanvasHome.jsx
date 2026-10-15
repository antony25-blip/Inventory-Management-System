import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffcanvasHome() {
  return (
    <Navbar expand={false}>
      <Container fluid>

        {/* Hamburger Menu */}
        <Navbar.Toggle aria-controls="offcanvasNavbar" />

        {/* Offcanvas Menu */}
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          //className="bg-primary text-white"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="flex-column">
              <Nav.Link href="/">Home</Nav.Link>
              <hr />
              <Nav.Link href="/product">Products</Nav.Link>
              {/* <hr /> */}
              {/* <Nav.Link href="/addproduct">Add Product</Nav.Link> */}
              <hr />
              <Nav.Link href="/sale">Sale</Nav.Link>
              <hr/>
              {/* <Nav.Link href="/report">Reports</Nav.Link> */}
            </Nav>
          </Offcanvas.Body>

        </Navbar.Offcanvas>

      </Container>
    </Navbar>
  );
}

export default OffcanvasHome;