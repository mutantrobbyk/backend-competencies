import React, {Component} from 'react'
import axios from 'axios'

export default class Users extends Component {
    constructor() {
        super()
        this.state = {
            users:[]
        }
    }
    componentDidMount() {
        this.getUsers()
    }
    getUsers = () => {
        axios.get(`/tests/getAllUsers/${this.props.match.params.id}`).then(res => {
            console.log(res.data)
        })
    }
    render() {
        return(
            <div>
                Users
            </div>
        )
    }
}