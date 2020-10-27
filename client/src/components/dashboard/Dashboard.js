import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Admin from '../Admin/admin';
import User from '../User/userDashboard';
import Fab from '@material-ui/core/Fab';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';



class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state ={
      showTaskDialog:false
    };
  }


  openTaskModal = () =>{
    this.setState({showTaskDialog:true});
  } 

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    console.log('User', this.props);
    return (
      <div>
        <div>
          <div>
            <h4 style={{marginLeft:'40%'}}>
              <b>Hey there,</b> {user.name} 
            </h4>
            <br/>
             {user.role == 'Admin' ?
              
               <Admin/>: <User name={user.name}/>}    
             
               <div>
               
              
              <Fab variant="extended" color="primary" style={{bottom:'0', right:'0', position: 'absolute', margin:'2%'}} onClick={this.onLogoutClick}>
                <ExitToAppIcon />
                Logout
              </Fab>
              
          </div>
        </div>
      </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
