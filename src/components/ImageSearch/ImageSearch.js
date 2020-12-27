import React, {Component} from 'react';
import {Container, Jumbotron} from "react-bootstrap";
import {Link} from "react-router-dom";
import '@tensorflow/tfjs';
import './ImageSearch.css'
import '../Home/Home.css'
import Serialize from "../../net/serialize";
import food from '../../api_keys'

const mobilenet = require('@tensorflow-models/mobilenet')


let net;

class ImageSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            result: {
                'name': null,
                'prob': null,
            },
            food: [],
            search: '',
            foodResults: false,
            loading: false,
            display: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            image: URL.createObjectURL(event.target.files[0]),
            display: '5px solid #285B52',
        })
        this.app().then(value => {
            this.setState({
                loading: false,
                result: {'name': value[0]['className'], 'prob': value[0]['probability']},
                search: value[0]['className'],
            })
            this.recipeLoad();
        })

    }

    app = async () => {
        this.setState({loading: true})
        const img = document.getElementById('img');

        net = await mobilenet.load();
        return await net.classify(img);
    }

    recipeLoad = () => {
        Serialize.foodData(`https://api.spoonacular.com/recipes/complexSearch/?query=${this.state.search}&apiKey=${food()}&number=100&includeNutrition=false`)
            .then(r => {
                this.setState({
                    food: r,
                    foodResults: true,
                });
            })
    }

    render() {
        let {name, prob} = this.state.result;
        let {food, foodResults, loading} = this.state;
        return (
            <Container>
                <div className='container'>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <img style={{border: this.state.display}} className='image-upload' crossOrigin='anonymous' id={'img'} src={this.state.image}/>
                    <h1 className='image-search-title'>SEARCH WITH AN IMAGE</h1>
                    <h3 className='image-search-title'>Upload or drag an image into the box below.</h3>
                    <form className='form' style={{marginBottom: 30}}>
                        <div className="image-upload">
                            <label for="uploaded" style={{cursor: "pointer"}}>
                                <i id='upload-image' className="fas fa-upload"/>
                            </label>
                            <input className='upload-file' onChange={this.handleChange} id='uploaded' type='file' accept="image/png, image/jpeg"/>
                        </div>
                    </form>
                    <Jumbotron style={{padding: 10}}>
                        {loading ?
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <div className="lds-ring"/>
                            </div>
                            :
                            <div className='container'>
                                <h5 className='image-search-title'>{name == null ? null : `Name: ${name.toUpperCase()}`}</h5>
                                <h5 className='image-search-title'>{prob == null ? null : `Confidence: ${(prob * 100).toFixed(2)}%`}</h5>
                                {foodResults === true ?
                                    food.map((item, index) => {
                                            return (
                                                <div className={"recipe1"} key={index}>
                                                    <Link to={{pathname: '/instructions', item: item,}}>
                                                        <h1 className={'recipe-title'}>{item.title}</h1>
                                                        <div className='gradient'>
                                                            <img className={'recipe-img'} src={item.img} alt={item.title}/>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        }
                                    )
                                    : <br />}
                            </div>
                        }
                    </Jumbotron>
                </div>
            </Container>
        )
    }

}

export default ImageSearch;
