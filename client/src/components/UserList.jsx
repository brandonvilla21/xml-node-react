import React, { Component } from 'react'
import axios from 'axios'
import UserItem from './UserItem'

class UserList extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            xml: null,
            name: '',
            email: '',
            lastname: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    componentWillMount() {
        this.getUsers()
            .then( response => {
                console.log(response)
                const xml = response.data
                const users = this.getUserValues( xml )
                this.setState({ xml, users })
            })
            .catch( error => console.log(error))
    }
    
    getUserValues( xml ) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml,'text/xml');
        const elements = xmlDoc.getElementsByTagName('name');
        const users = []
        for (let i = 0; i < elements.length; i++) {
            users.push({
                user_id: xmlDoc.getElementsByTagName('user_id')[i].childNodes[0].nodeValue,
                name: xmlDoc.getElementsByTagName('name')[i].childNodes[0].nodeValue,
                email: xmlDoc.getElementsByTagName('email')[i].childNodes[0].nodeValue,
                lastname: xmlDoc.getElementsByTagName('lastname')[i].childNodes[0].nodeValue
            })
        }
        return users
    }
    getUsers() {
        return axios.get('http://localhost:3001/user')
    }
    createUser() {
        return axios.post('http://localhost:3001/user',{
            name: this.state.name,
            lastname: this.state.lastname,
            email: this.state.email,
        })
    }
    async handleSubmit( event ) {
        event.preventDefault()
        try {
            await this.createUser()
            const response = await this.getUsers()
            const xml = response.data
            const users = this.getUserValues( xml )
            this.setState({ xml, users })
        } catch (error) {
            console.log('ERROR: ', error)
        }        

    }

    handleInputChange( event ) {
        const value = event.target.value
        const name = event.target.name

        this.setState( { [name]: value })
    }

    render() {
        const userItems = this.state.users.map( (user, index) => {
            return (
                <UserItem key={index} item={user} />
            )
        })
        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="col-md-12">
                        <h3>Lista de usuarios de la base de datos</h3>
                        <br/>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><strong>ID</strong></td>
                                    <td><strong>Nombre</strong></td>
                                    <td><strong>Apellidos</strong></td>
                                    <td><strong>Email</strong></td>
                                </tr>
                                { userItems }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-12">
                        <form onSubmit={this.handleSubmit} className="form-control">
                            <h3>Crear un nuevo usuario</h3>
                            <hr/>
                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <input  onChange={this.handleInputChange} 
                                        name="name" type="text"
                                        className="form-control" placeholder="Nombre..." required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname">Apellidos</label>
                                <input  onChange={this.handleInputChange}
                                        name="lastname" type="text"
                                        className="form-control" placeholder="Apellidos..." required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input  onChange={this.handleInputChange}
                                        name="email" type="email"
                                        className="form-control" placeholder="email@example.com" required/>
                            </div>
                            <div className="form-group text-right">
                                <button className="btn btn-outline-primary">Agregar</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="col-md-12">
                        <h3>Información XML obtenida del servidor</h3>
                        <pre>
                            { this.state.xml }
                        </pre>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserList