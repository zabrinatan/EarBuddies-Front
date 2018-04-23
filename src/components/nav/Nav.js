import React, { Component } from "react";
import { Link } from 'react-router-dom'




// const signOut = function () {

// }



class Nav extends Component {

  state = {
    logged: true,
  };

  _signOut() {
    localStorage.setItem('jwtToken', '')
  }


  render(){
    return (
      <header>
        <nav className="nav_bar">
          <Link to="/"><img src="" alt="logo"/></Link>
          { window.localStorage.jwtToken ? <Link onClick={this._signOut} to="/">Logout</Link> :
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
          }
        </nav>
      </header>
    )
  }

}


export default Nav;
