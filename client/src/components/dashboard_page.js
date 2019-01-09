import React, {Component} from 'react'
import Dashboard from './dashboard/dashboard';

class DashboardPage extends Component{
  render(){
    return(
      <Dashboard {...this.props.details}/>
    )
  }
}

export default DashboardPage