import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UserList from './UserList'

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={ UserList } />
        </Switch>
    </main>
)

export default Main