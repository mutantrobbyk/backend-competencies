import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

export default class Test extends Component {
    constructor () {
        super()
        this.state = {
            search: ''
        }
    }
    getUsers = () => {
        axios.get(`/user?=${this.state.search}`).then(res => {
            console.log(res.data)
        })
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render () {
        return(
            <div>
                <img src=".static/bike.jpg" alt=""/>
                <button onClick={() => this.props.history.push(`/test/${id}`)}></button>
            </div>
        )
    }

}