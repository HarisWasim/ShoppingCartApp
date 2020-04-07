import React, { Component } from "react";
import "./css/App.css";
import {
  Toolbar,
  Typography,
  IconButton,
  AppBar,
  InputBase,
} from "../node_modules/@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { fade, withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ListCartItems from "./ListCartItems";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  search: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 20,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
});

const API_ENDPOINT =
  "https://gopuff-public.s3.amazonaws.com/dev-assignments/product/order.json";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      cartMetaData: [],
    };
    this.fetchCartData = this.fetchCartData.bind(this);
  }

  fetchCartData() {
    fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ cart: result.cart.products });
          return result;
        },
        (error) => {
          console.log("error: ", error);
        }
      )
      .then(
        (json) => {
          let allProductIDs = json.cart.products
            .map((product) => product.product_id)
            .join(",");
          const API_AllProductIDs = `https://prodcat.gopuff.com/api/products/?location_id=-1&product_ids=${allProductIDs}`;
          fetch(API_AllProductIDs)
            .then((res) => res.json())
            .then(
              (result) => {
                this.setState({ cartMetaData: result });
                return result;
              },
              (error) => {
                console.log("error: ", error);
              }
            );
        },
        (error) => {
          console.log("error: ", error);
        }
      );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              aria-label="display more actions"
              edge="end"
              color="inherit"
              onClick={() => {
                this.setState({ cart: [], cartMetaData: [] });
              }}
            >
              <Typography component={"span"} variant="h6">
                Welcome to goPuff!
              </Typography>
            </IconButton>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <IconButton
              aria-label="display more actions"
              edge="end"
              color="inherit"
              onClick={this.fetchCartData}
            >
              <Typography component={"span"} variant="h6">
                My Cart
              </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
        <ListCartItems
          cart={this.state.cartMetaData.products}
          saleItems={this.state.cart}
        />
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
