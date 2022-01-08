import React, { useState, useEffect } from "react";
import StartBar from "./components/StartBar";
import {
    Header,
    Segment,
    Input,
    Button,
    Form,
    Card,
    Icon,
    Image,
    Statistic,
    Pagination,
    Grid,
    Menu,
    Sidebar,
    Divider,
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import api_link from './Link'

function SingleProduct(props) {
    const [product, setProduct] = useState({});

    const [present, setPresent] = useState(false);

    const [cart, setCart] = useState(0);

    const [visible, setVisible] = useState(false);

    const [quantity, setQuantity] = useState(0);

    const [currentId, setCurrentId] = useState(-1);

    const [cartItems, setCartItems] = useState([]);

    const [search, setSearch] = useState("");

    const [redirect, setRedirect] = useState(false);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        var prod = props.location.state.product_id;
        var items = parseInt(localStorage.getItem("cart"));
        var cartLocal = JSON.parse(localStorage.getItem("products"));
        var cartTotal = parseInt(localStorage.getItem("total"));

        var product_id = prod.id

        var searchi = localStorage.getItem("search");
        if (searchi !== null) {
            setSearch(searchi);
        }
        if (!(items >= 0)) {
            localStorage.setItem("cart", 0);
            localStorage.setItem("products", []);
            localStorage.setItem("total", 0);
            items = 0;
        } else {
            console.log(product_id);
            const presentId = cartLocal.findIndex(
                (cartItem) => cartItem.id === product_id
            );
            console.log(presentId);
            setCurrentId(presentId);
            setCartItems(cartLocal);
            localStorage.setItem("total", cartTotal);
            setTotal(cartTotal);
            if (presentId > -1) {
                const quan = cartLocal[presentId].quantity;
                console.log(quan);
                setQuantity(quan);
            }
        }
        setCart(items);
        setProduct(prod)
        setPresent(true)
    }, []);

    const addToCart = () => {
        console.log(quantity)
        if (quantity <= 0) {
            if(currentId > -1){
                console.log(currentId)
                cartItems.splice(currentId,1)
                setCurrentId(-1)
            }
        } else {
            if (currentId == -1) {
                product.quantity = quantity;
                cartItems.push(product);
                setCurrentId(cartItems.length - 1)
            } else {
                cartItems[currentId].quantity = quantity;
            }
        }

        var cartTotal = 0;
        cartItems.map((row, index) => {
            cartTotal += parseInt(row.price * parseInt(row.quantity));
            return 0;
        });
        setTotal(cartTotal);
        localStorage.setItem("products", JSON.stringify(cartItems));
        localStorage.setItem("total", cartTotal);
        setCart((prevState) => prevState + 1);
        localStorage.setItem("cart", cart + 1);
        if(cartItems.length > 0)
            setVisible(true);
    };

    const handleChange = (e) => {
        setQuantity(e.target.value);
    };

    return (
        <div onClick={() => {
            if(visible)
                setVisible(false)
        }}>
            {redirect && <Redirect to="/products" />}
            <StartBar type="products" cart={cartItems === null ? 0 : cartItems.length} visible = {visible} />

            {/* <Sidebar.Pushable as={Segment}> */}
            {/* <Sidebar
                as={Menu}
                animation="overlay"
                direction="right"
                icon="labeled"
                onHide={() => setVisible(false)}
                vertical
                visible={visible}
                width="wide"
            >
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
            </Sidebar> */}
            <Sidebar.Pusher>
                <div class="content">
                    <Header as="h1">Products</Header>
                    <div class="leftAlign">
                        <Segment padded>
                            <Header as="h3" dividing>
                                Product
                            </Header>
                            <Form
                                onSubmit={() => {
                                    localStorage.setItem("search", search);
                                    setRedirect(true);
                                }}
                            >
                                <Form.Field>
                                    <Input
                                        action={{ icon: "search" }}
                                        placeholder="Search..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        fluid
                                    />
                                </Form.Field>
                            </Form>
                            <br />

                            {present && (
                                <div>
                                    <Grid stackable columns={2}>
                                        <Grid.Column>
                                            <Image
                                                src={
                                                    api_link +
                                                    product.product_id[0].image
                                                }
                                                size="big"
                                                bordered
                                            />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Header as="h1">
                                                {product.product_name}
                                            </Header>
                                            <Header as="h3">
                                                Product Code:{" "}
                                                {product.product_code}
                                            </Header>
                                            <br />
                                            <Icon
                                                name="rupee icon"
                                                size="large"
                                            />
                                            <b>{product.price}</b>
                                            <br />
                                            <br />
                                            <Form>
                                                <Form.Group inline>
                                                    <Form.Field>
                                                        <label>Quantity</label>
                                                        <input
                                                            placeholder="0"
                                                            type="number"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            value={quantity}
                                                            required
                                                        />
                                                    </Form.Field>
                                                </Form.Group>
                                            </Form>
                                            <br />
                                            <Button
                                                fluid
                                                color="brown"
                                                onClick={addToCart}
                                            >
                                                Add To Cart
                                            </Button>
                                        </Grid.Column>
                                    </Grid>
                                    <Header as="h3" fluid>
                                        Product Specifications
                                    </Header>
                                    <Grid stackable columns={2}>
                                        <Grid.Column>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: product.details,
                                                }}
                                                className="content"
                                            />
                                        </Grid.Column>
                                    </Grid>
                                </div>
                            )}
                        </Segment>
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                </div>
            </Sidebar.Pusher>
        </div>
    );
}

export default SingleProduct;
