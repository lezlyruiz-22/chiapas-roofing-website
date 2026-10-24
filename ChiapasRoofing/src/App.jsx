import { useState } from 'react'
import { Form, Button, Navbar, Nav, NavDropdown, Carousel, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {

  /* Contact Navigation Bar */
  function ContactNavigationBar() {
    return <>
      <Navbar className="contact-nav-bar py-0 expand-lg">
        <Nav>
          <Nav.Link>Contact Us</Nav.Link>
          <Nav.Link>Estimate</Nav.Link>
        </Nav>
       <Nav className="ms-auto">
        <Nav.Link href='tel:(920) 421-1680'>(920) 421-1680</Nav.Link>
        <Nav.Link href='tel:(920) 805-8081' className="d-none d-lg-block">(920) 805-8081</Nav.Link>
        <Nav.Link href="mailto:dari.chiapasroofing@hotmail.com" className="d-none d-md-block">dari.chiapasroofing@hotmail.com</Nav.Link>
    </Nav>
      </Navbar>
    </>
  }

   /* Web Page Navigation Bar */
  function WebPageNavigationBar() {
    return <>
      <Navbar className="web-nav-bar" expand="lg">
        <img src="pictures/chiapas_roofing_logo.png" alt="Chiapas Roofing Logo" style={{ width: '70px', height: 'auto' }} />
        <Navbar.Toggle aria-controls="basic-nav-dropdown" />
        <Navbar.Collapse id="basic-nav-dropdown">
          <Nav className="w-100 justify-content-between">
            <Nav.Link href="#home">Roofing</Nav.Link>
            <Nav.Link href="#about">Gutters & Downspouts</Nav.Link>
            <Nav.Link href="#about">Reviews</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
            <NavDropdown title="Services" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Residential Roofing</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Commercial Roofing</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">Free Estimate</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  }

  function EstimateForm() {
    return <>
      <Form>
        <Form.Label>Name</Form.Label>
        <Form.Control></Form.Control>
        <Form.Label>Phone Number</Form.Label>
        <Form.Control></Form.Control>
        <Form.Label>Email Address</Form.Label>
        <Form.Control></Form.Control>              
      </Form>
    </>
  }

  function MainImageForm() {
    return <>
      <div className="position-relative">
        <img src="pictures/main-page-roof.jpg" alt="Main Page Roof Image" style={{ width: '100%', height: 'auto', minWidth: '700px', minHeight: '700px', objectPosition: '100% center', objectFit: 'cover'}} />
        <div className="layer-on-top-words">
          <h1 >CHIAPAS ROOFING</h1>
          <div className="caption-grey">
            <p>Serving home and business owners across Door County, we deliver dependable roof and gutter care built to withstand Wisconsin weather. Honest service, quality craftsmanship, and lasting protection—from our family to yours.</p>
          </div>
        </div>
        <div className="layer-on-top-form">
          <EstimateForm></EstimateForm>
        </div>
      </div>
    </>
  }

  return (
    <>
      <ContactNavigationBar />
      <WebPageNavigationBar />
      <MainImageForm></MainImageForm>
    </>
  )
}

export default App
