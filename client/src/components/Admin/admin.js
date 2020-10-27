import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./navbar"
import TaskList from "./tasks";
import EditTask from "./editTask";
import CreateTask from "./createTasks";
import CreateUser from "./createUser";

function Admin() {
  return (
    <div>
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={TaskList} />
      <Route path="/edit/:id" component={EditTask} />
      <Route path="/create" component={CreateTask} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
    <h1 style={{marginLeft:'25%'}}>Toggle navigations for Admin tasks</h1>
    </div>
  );
}

export default Admin;