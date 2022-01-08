import React, { useEffect, useState } from "react";
import {
    Segment,
    Menu,
    Icon,
    Header,
    Sidebar,
    Divider,
    Button,
    Grid,
    Image,
    Form,
} from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import api_link from "../Link";

function StartBar(props) {
    const [visible, setVisible] = useState(false);

    const [present, setPresent] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const [total, setTotal] = useState(0);

    try {
        if (props.visible === true && visible === false){
            setVisible(true);
            const cart = JSON.parse(localStorage.getItem("products"));
            if (cart !== null){
                const totals = localStorage.getItem("total");
                setTotal(totals)
                setCartItems(cart)
                setPresent(true);
            }
        } 
    } catch (error) {
        console.log("nothing");
    }

    useEffect(() => {
        var cart = [];
        try {
            cart = JSON.parse(localStorage.getItem("products"));
        } catch (error) {
            localStorage.setItem("products", JSON.stringify(cartItems));
        }
        const totals = localStorage.getItem("total");
        setCartItems(cart);
        setTotal(totals);
        if (cart !== null) setPresent(true);
    }, []);

    const handleCart = () => {
        const cart = JSON.parse(localStorage.getItem("products"));
        const totals = localStorage.getItem("total");
        setCartItems(cart);
        setTotal(totals);
        if (cart !== null) setPresent(true);
        setVisible(true);
    };

    const handleItemClick = () => {
        console.log("Item logged");
    };

    const items = localStorage.getItem("cart");

    return (
        <div>
            <Segment inverted>
                <Menu inverted pointing secondary stackable>
                    <Menu.Item header>Janta Light House</Menu.Item>
                    <Link to="/">
                        <Menu.Item
                            name="Home"
                            active={props.type === "home"}
                            onClick={handleItemClick}
                        />
                    </Link>
                    <Link to="/products">
                        <Menu.Item
                            name="Products"
                            active={props.type === "products"}
                            onClick={handleItemClick}
                        />
                    </Link>
                    <Link to="/">
                        <Menu.Item
                            name="About Us"
                            active={props.type === "aboutus"}
                            onClick={handleItemClick}
                        />
                    </Link>
                    {/* <Link to="/"> */}
                    <Menu.Menu position="right">
                        <Menu.Item name="video camera" onClick={handleCart}>
                            <Icon name="cart" />
                            {props.cart}
                        </Menu.Item>
                    </Menu.Menu>
                    {/* </Link> */}
                </Menu>
            </Segment>

            <Sidebar
                as={Menu}
                animation="overlay"
                direction="right"
                icon="labeled"
                onHide={() => {
                    localStorage.setItem('products',cartItems)
                    localStorage.setItem('total',total)
                    setVisible(false)
                }}
                vertical
                visible={visible}
                width="wide"
            >
                {/* <Menu> */}
                {/* <Menu.Item as="a" inverted>
                    <Header as="h1">Cart</Header>
                </Menu.Item> */}
                {/* </Menu> */}
                <Header as="h1" block>
                    Cart
                </Header>
                <br />
                <div className="scrollSegment">
                    {present &&
                        cartItems.map((row, index) => {
                            return (
                                <div>
                                    <Grid stackable columns={2}>
                                        <Grid.Column>
                                            <Image
                                                src={
                                                    api_link +
                                                    row.product_id[0].image
                                                }
                                                size="big"
                                                bordered
                                            />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Header as="h5">
                                                {row.product_name}
                                            </Header>
                                            <Icon
                                                name="rupee icon"
                                                size="large"
                                            />
                                            <span>{row.price}</span>
                                            <br />
                                            <br />
                                            <Form>
                                                <Form.Field>
                                                    <input
                                                        placeholder="0"
                                                        type="number"
                                                        value={row.quantity}
                                                        min="0"
                                                        onChange = {(e) => {
                                                            var cartTotal = 0
                                                            cartItems[index].quantity = e.target.value
                                                            setCartItems(cartItems)
                                                            cartItems.map((row, index) => {
                                                                try{
                                                                    if(row.quantity !== "")
                                                                        cartTotal += parseInt(row.price * parseInt(row.quantity));
                                                                }
                                                                catch{

                                                                }
                                                                return 0;
                                                            });
                                                            setTotal(cartTotal)
                                                        }}
                                                    />
                                                </Form.Field>
                                            </Form>
                                        </Grid.Column>
                                    </Grid>
                                    <Divider />
                                </div>
                            );
                        })}
                </div>
                <br />
                <div className="leftAlign margin">
                    <Header as="h2">SubTotal</Header>
                    <Icon name="rupee icon" size="big" />
                    <span style={{ fontSize: "200%" }}>{total}</span>
                </div>
                <br />
                <Button primary fluid class="margin">
                    Proceed to Checkout
                </Button>
            </Sidebar>
        </div>
    );
}

export default StartBar;
