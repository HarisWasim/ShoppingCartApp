import React, { Component } from "react";
import "./css/App.css";
import Card from "../node_modules/react-bootstrap/Card";
import { Button } from "../node_modules/@material-ui/core";

const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParserInstance = new HtmlToReactParser();

export default class ListCartItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow() {
    const { cart, saleItems } = this.props;
    let cartOutput = cart.map((item, index) => {
      return (
        <Card className="card" key={item.product_id}>
          {saleItems[index].discount > 0 ? (
            <Card.Header className="sale">Sale</Card.Header>
          ) : (
            ""
          )}
          <Card.Img variant="top" src={item.avatar.small} />
          <Card.Body>
            <Card.Title>
              <div className="title">{item.name}</div>
              <div> By: {item.brand ? item.brand : ""} </div>
              <div> Quantity: {item.confirmed} </div>
            </Card.Title>
            <Card.Text
              style={{ maxHeight: 100, minHeight: 90, overflowY: "scroll" }}
            >
              {htmlToReactParserInstance.parse(item.description)}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            <div className="footer">
              {saleItems[index].discount > 0 ? (
                <span className="sale">
                  SALE {saleItems[index].credit_coupon_price}
                </span>
              ) : (
                saleItems[index].price
              )}
              <Button variant="text">More Info</Button>
              <Button variant="text">Remove All</Button>
            </div>
          </Card.Footer>
        </Card>
      );
    });
    return cartOutput;
  }

  calculateTotal() {
    const { cart, saleItems } = this.props;
    let subtotal = 0;
    let saleTotal = 0;
    if (cart) {
      for (let i = 0; i < cart.length; i++) {
        subtotal +=
          cart[i].quantity > 0
            ? cart[i].quantity * cart[i].price
            : cart[i].price;
        saleTotal +=
          cart[i].quantity > 0
            ? cart[i].quantity * saleItems[i].credit_coupon_price
            : saleItems[i].credit_coupon_price;
      }
    }
    return [
      Math.round((subtotal + Number.EPSILON) * 100) / 100,
      Math.round((saleTotal + Number.EPSILON) * 100) / 100,
    ];
  }

  render() {
    const { cart } = this.props;
    const total = this.calculateTotal();
    return (
      <div>
        <Card border="primary" className="summary">
          <Card.Body>
            <Card.Title>
              <div className="title">Subtotal: {total[0]}</div>
              <div className="sale">Sale Total: {total[1]}</div>
            </Card.Title>
          </Card.Body>
        </Card>
        <div className="listContainer">
          {cart ? this.renderRow() : `Welcome to our store!`}
        </div>
      </div>
    );
  }
}
