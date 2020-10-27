import React, {Component} from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./navbar"
import TaskList from "./tasks";
import EditTask from "./editTask";


class userDashboard extends Component{

    render(){
        
        return(
             <div>
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" render={(props) => <TaskList name={this.props.name} />} />
      <br/> 
      <br/>
      <br/>
      <Route path="/edit/:id" component={EditTask} />
      
      </div>
    </Router>
        {/* <h1>Navigate to tasks to check your tasks!{this.props.name}</h1> */}
    </div>
        );
    }
}

export default userDashboard; 