import React, { Component } from 'react'

class UserItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: props.item
        }
    }
    render() {
        return (
        <tr>
            <td> { this.state.item.user_id }</td>
            <td> { this.state.item.name }</td>
            <td> { this.state.item.lastname } </td>
            <td> { this.state.item.email } </td>
        </tr>
        )
    }
}

export default UserItem