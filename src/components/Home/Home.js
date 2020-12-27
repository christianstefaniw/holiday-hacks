import React, {Component} from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import {Container, Jumbotron, Row, Col} from "react-bootstrap";
import food from '../../api_keys';
import Serialize from "../../net/serialize";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            food: [],
            loading: true,
            search: 'christmas'
        }
        this.recipeLoad();
    }

    recipeLoad = () => {
        if (this.state.search.includes(',')) {
            this.state.search.replace(' ', '+')
            Serialize.foodData(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${this.state.search}&apiKey=${food()}&number=500&includeNutrition=false`)
                .then(r => {
                    this.setState({
                        food: r,
                        loading: false
                    });
                })
        } else {
            Serialize.foodData(`https://api.spoonacular.com/recipes/complexSearch/?query=${this.state.search}&apiKey=${food()}&number=500&includeNutrition=false`)
                .then(r => {
                    this.setState({
                        food: r,
                        loading: false
                    });
                })
        }
    }

    recipeSearch = (e) => {
        this.setState({
            search: [e.target.value.toLowerCase()],
            loading: true,
        })
        this.recipeLoad();
    }

    render() {
        let {food, loading} = this.state
        return (
            <Container fluid className='home-container'>
                <h1 className='title'>RECIPES</h1>
                <Container style={{marginTop: '1rem', marginBottom: 25}}>
                    <input
                        className="search-bar"
                        type="text"
                        placeholder='   Search Recipe by word or ingredients like (sugar, flour)            🔍'
                        onChange={this.recipeSearch}/>
                </Container>
                <Jumbotron>
                    <Row>
                        {loading ?
                            <div style={{margin: "auto"}}>
                                <div className="lds-dual-ring"/>
                            </div>

                            : food.map((item, index) => {
                                    return (
                                        <Col sm="3" className="center">
                                            <div className={"recipe"} key={index}>
                                                <Link to={{pathname: '/instructions', item: item,}}>
                                                    <h1 className={'recipe-title'}>{item.title}</h1>
                                                    <div className='gradient'>
                                                        <img className={'recipe-img'} src={item.img} alt={item.title}/>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Col>

                                    )
                                }
                            )
                        }
                        {food.length === 0 && loading === false ?
                            <p style={{margin: "auto"}}>No Recipes for {this.state.search}</p>
                            : <p/>}
                    </Row>
                </Jumbotron>
            </Container>
        )
    }

}

export default Home;
