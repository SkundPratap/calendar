

import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { Link } from 'react-router-dom';
import axios from 'axios';

const Task = props => (
  <tr>
    <td>{props.task.title}</td>
    <td>{props.task.description}</td>
    <td>{props.task.status}</td>
    <td>{(props.task.date).slice(0,10)}</td>
    <td>{props.task.username}</td>
    <td>
      <Link to={"/edit/"+props.task._id}>edit</Link> | <a href="#" onClick={() => { props.deleteTask(props.task._id) }}>delete</a>
    </td>
  </tr>
)
 
export default class Tasks extends Component {
 
 


  constructor(props) {
        super(props);
    
        this.deleteTask = this.deleteTask.bind(this)
    
        this.state = {tasks: [], date: new Date()};
      }
    
      componentDidMount() {
        axios.get('/api/tasks/')
          .then(response => {
            console.log('RES',response);
            this.setState({ tasks: response.data })
          })
          .catch((error) => {
            console.log(error);
          })

          
      }
    
      deleteTask(id) {
        axios.delete('/api/tasks/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          tasks: this.state.tasks.filter(el => el._id !== id)
        })
      }
    
      taskList() {
        return this.state.tasks.map(currenttask => {
          return <Task task={currenttask} deleteTask={this.deleteTask} key={currenttask._id}/>;
        })
      }
  
      onChange = date => {
        console.log(date);
        // var startDate = Date.parse(date);
        // var enddate = startDate + 86400000;
        // this.setState({
        //   tasks: this.state.tasks.filter(task => Date.parse(task.date) >= startDate && Date.parse(task.date) <= enddate)
        // tasks: response.data.filter(task => task.date.slice(0,10) === date1
      
      
      //})

        var date = new Date(date),
                  mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                  day = ("0" + date.getDate()).slice(-2);
        var date1=  [date.getFullYear(), mnth, day].join("-");
        axios.get('/api/tasks/')
        .then(response => {
          console.log('RES',response);
          this.setState({ tasks: response.data.filter( task => task.date.slice(0,10) === date1) })
        })
        .catch((error) => {
          console.log(error);
        })

      }

 
  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />

        <div> 
        <h3>Task View </h3>
        
         {this.taskList() < 0 ? <div>
           <h4> Please select a date </h4>
         </div> 
        : 
        <table className="table">
        <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Date</th>
              <th>Assigned to</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.taskList() }
          </tbody>
        </table>

        }
         
               </div>
      </div>
    );
  }
}