import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditTask extends Component {
  constructor(props) {
    super(props);

    
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeReason = this.onChangeReason.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title:'',
      description: '',
      status:'',
      date: new Date(),
      reason:''
      
    }
  }

  componentDidMount() {
    axios.get('/api/tasks/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          title: response.data.title,
          description: response.data.description,
          status: response.data.status,
          date: new Date(response.data.date), 
          reason: response.data.reason,

        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    
      .catch((error) => {
        console.log(error);
      })

  }

  

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }


  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onChangeReason(e) {
    this.setState({
      reason: e.target.value
    })
  }
  


  onSubmit(e) {
    e.preventDefault();

    const task = {
      username: this.state.username,
      title: this.state.title,
      description: this.state.description,
      status: this.state.status,
      date: this.state.date, 
      reason:this.state.reason,
    }

    console.log(task);

    axios.post('/api/tasks/update/' + this.props.match.params.id, task)
      .then(res => console.log(res.data));

    
  }

  render() {
    return (
    <div>
      <h3>Edit Task</h3>
      <form onSubmit={this.onSubmit}>
        
        <div className="form-group"> 
          <label>Title: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Status: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.status}
              onChange={this.onChangeStatus}>
              <option value="">Please select one.</option>
              <option value="Not Completed">Not Completed</option>
              <option value="Completed">Completed</option>
              <option value="Delayed">Delayed</option>
          </select>
        </div>
         {this.state.status === 'Delayed' ? <div className="form-group">
          <label>Reason</label>
          <div>
          <input  type="text"
            required
              className="form-control"
              value={this.state.reason}
              onChange={this.onChangeReason}
              
              />
          </div>
        </div> : ''}
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Task" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}