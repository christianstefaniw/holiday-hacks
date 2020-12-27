import React, {Component} from 'react';
import {Container, Jumbotron, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Instructions.css';
import Serialize from "../../net/serialize";
import food from '../../api_keys';


class Instructions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instructions: [],
            ingredients: [],
            loading: true,
        }
        try {
            Serialize.instructionData(`https://api.spoonacular.com/recipes/${this.props.location.item.id}/analyzedInstructions?includeNutrition=false&apiKey=${food()}`, this.props.location.item)
                .then(r => {
                    this.setState({instructions: r, loading: false})
                })
        } catch (error) {
            window.location.href = '/'
        }
    }

    render() {
        let {instructions, ingredients, loading} = this.state
        if (loading === false) {
            for (let i = 0; i < instructions.steps.length; i++) {
                for (let x = 0; x < instructions.steps[i].ingredients.length; x++) {
                    this.state.ingredients.push(instructions.steps[i].ingredients[x].name + (instructions.steps.length - 1 === i && instructions.steps[i].ingredients.length - 1 === x ? '' : ', '))
                }
            }
            return (
                <Container className='directions-container'>
                    <div className={'instructions'}>
                        <i className="fas fa-long-arrow-alt-left" onClick={() => this.props.history.goBack()}> Back</i>
                        <Card className="instructions-card">
                            <Card.Img variant="top" src={this.props.location.item.img}/>
                        </Card>
                        <div className='recipe-directions'>
                            <h2 className='directions-title'>{this.props.location.item.title}</h2>
                            <p style={{marginTop: 20, marginBottom: 20}} className={'instructions-needed'}>
                                {ingredients.join(" ")}
                            </p>

                            <hr/>
                            <Jumbotron>
                                {instructions.steps.map((item, index) => {
                                        return (
                                            <div key={index} className='steps'>
                                                <h5 className={'instructions-steps'}>
                                                    <b>Step <span style={{color: "red"}}>{index + 1}:</span></b></h5>
                                                <p className={'instructions-step'}> {instructions.steps[index]['step']}</p>
                                            </div>
                                        )
                                    }
                                )
                                }
                            </Jumbotron>
                        </div>
                    </div>
                </Container>

            )
        }
        return (
            <div style={{display: "flex", justifyContent: "center", marginTop: 50}}>
                <div className="lds-dual-ring"/>
            </div>
        )
    }

}

export default Instructions;
