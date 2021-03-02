import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import LogIn from '../screens/login'
import SignUp from '../screens/signup'
import DashBoard from '../screens/dashboard'
import HistoryScreen from '../screens/history'


const AppRouter = ({ user }) => {



    return (
        <Router>
            {/* <Switch>
            <Route path="/" exact>
              {authChecker(!user,<LogIn/>,'/dashboard')}
              </Route>
           
            <Route path="/dashboard">
            {authChecker(user,<DashBoard/>)}

            

             
            </Route>
            <Route path="/signup">
            {authChecker(!user,<SignUp/>,'/dashboard')}

             
            </Route>
          </Switch> */}
            <div>
                <Switch>
                    <Route path="/" exact>
                        {authChecker(!user, <LogIn />, '/dashboard')}
                    </Route>

                    <Route path="/dashboard">
                        {authChecker(user, <DashBoard  />)}
                    </Route>
                    <Route path="/signup">
                        {authChecker(!user, <SignUp />, '/dashboard')}


                    </Route>
                    <Route path='/history' component={HistoryScreen} />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter


const authChecker = (user, component, path = '/') => {
    return user ? component : <Redirect to={path} />
}
