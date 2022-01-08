import React, { useState, useEffect } from "react";
import {
    Header,
    Segment,
    Input,
    Button,
    Form,
    Card,
    Icon,
    Image,
    Pagination,
} from "semantic-ui-react";
import StartBar from "./components/StartBar";
import { Link, Redirect } from "react-router-dom";
import api_link from "./Link";

function Products() {
    const [filter, setFilter] = useState(false);

    const [products, setProducts] = useState([]);

    const [present, setPresent] = useState(false);

    const [search, setSearch] = useState("");

    const [cartItems, setCartItems] = useState([]);

    const [redirect, setRedirect] = useState({
        present: false,
        id: {},
    });

    useEffect(() => {
        console.log(api_link);
        var searchi = localStorage.getItem("search");
        if(searchi === null)
            searchi = ""
        var cartItem = [];
        try {
            cartItem = JSON.parse(localStorage.getItem("products"));
        } catch (error) {
            localStorage.setItem("products", JSON.stringify(cartItems));
        }
        setCartItems(cartItem);
        var query = "";
        if (search !== "") {
            setSearch(searchi);
            query = "products/" + searchi;
        } else {
            query = "allproducts";
        }
        fetch(`${api_link}/api/${query}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProducts(data);
                setPresent(true);
            });
    }, []);

    const handleSubmit = () => {
        var query;
        if (search === "") query = "allproducts";
        else {
            query = "products/" + search;
        }
        localStorage.setItem("search", search);
        fetch(`${api_link}/api/${query}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProducts(data);
                setPresent(true);
            });
    };

    if (redirect.present) {
        console.log(redirect);
    }

    return (
        <div>
            {redirect.present && (
                <Redirect
                    push
                    to={{
                        pathname: "/single",
                        state: { product_id: redirect.id },
                    }}
                />
            )}
            <StartBar
                type="products"
                cart={cartItems === null ? 0 : cartItems.length}
            />
            <div class="content">
                <Header as="h1">Products</Header>
                <div class="leftAlign">
                    <Segment padded>
                        <Header as="h3" dividing>
                            All Products
                        </Header>
                        <Form onSubmit={handleSubmit}>
                            <Form.Field>
                                <Input
                                    action={{ icon: "search" }}
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    fluid
                                />
                            </Form.Field>
                        </Form>
                        <br />
                        {filter && (
                            <Form>
                                <Form.Group inline>
                                    <Form.Field>
                                        <label>Price</label>
                                        <input
                                            placeholder="Price Range"
                                            type="number"
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Category</label>
                                        <input placeholder="Enter category" />
                                    </Form.Field>
                                </Form.Group>
                            </Form>
                        )}
                        <Button
                            content="Filter"
                            icon="filter"
                            labelPosition="right"
                            onClick={() => setFilter(!filter)}
                        />
                        <br />
                        <br />
                        <br />
                        <Card.Group itemsPerRow={4} stackable>
                            {present &&
                                products.map((row, index) => {
                                    return (
                                        <Card
                                            onClick={() =>
                                                setRedirect({
                                                    present: true,
                                                    id: row,
                                                })
                                            }
                                        >
                                            <Image
                                                src={
                                                    api_link +
                                                    row.product_id[0].image
                                                }
                                                wrapped
                                                ui={false}
                                                className="img"
                                            />
                                            <Card.Content>
                                                <Card.Header>
                                                    {row.product_name}
                                                </Card.Header>
                                                <Card.Description textAlign="left">
                                                    <Icon
                                                        name="rupee icon"
                                                        size="large"
                                                    />
                                                    <b>{row.price}</b>
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                    );
                                })}
                        </Card.Group>
                        {present && (
                            <Segment textAlign="center">
                                <Pagination
                                    defaultActivePage={1}
                                    firstItem={null}
                                    lastItem={null}
                                    pointing
                                    secondary
                                    totalPages={products.length / 4}
                                />
                            </Segment>
                        )}
                    </Segment>
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        </div>
    );
}

export default Products;
