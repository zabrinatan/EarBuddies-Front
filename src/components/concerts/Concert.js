import React, {PureComponent as Component} from 'react';
import axios from 'axios';
import Attending from '../friendships/Attending.js'
import jwtDecoder from "jwt-decode";

// const token = localStorage.getItem('jwtToken');
// const current_user = jwtDecoder(token);

class Concert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venue: [],
      concert: this.props.location.state,
      current_user: {}
    };
    this.findVenue = this.findVenue.bind(this);
    console.log(this.state.concert[0])
    console.log(this.props.location.state);
  }
  componentDidMount = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const user = jwtDecoder(token);
      this.setState({
        user
      });
    }
  };

  deleteUserFromEvent = () => {
    //console.log(current_user.sub);
    console.log(parseInt(this.props.match.params.id));
    axios({
      url: ``,
      method: "delete",
      data: {
        user_id: this.state.current_user.sub,
        event_id: parseInt(this.props.match.params.id)
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  addUserToEventList = () => {
    //console.log(current_user.sub);
    console.log(parseInt(this.props.match.params.id));
    axios({
      url: "https://earbuddies1.herokuapp.com/events_users",
      method: "post",
      data: {
        user_id: this.state.current_user.sub,
        event_id: parseInt(this.props.match.params.id)
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  render() {
    return (
      <div>
<<<<<<< HEAD
          {this.state.concert.map(c => <li key={c.id}> {c.name}</li>)}
          {this.state.concert.map(c => <li key={c.id}> {c.description}</li>)}
          {this.state.concert.map(c => <li key={c.id}> {c.date}</li>)}
          {this.state.concert.map(c => <li key={c.id}> {c.genre}</li>)}
          {this.state.concert.map(c => <li key={c.id}> {c.ticket_url}</li>)}
          {this.state.concert.map(c => <img key={c.id} src={c.image} alt={c.name}/>)}
          {this.state.venue.map (v => <li key={v.id}> {v.name}</li>)}
          {/* will go to venue page */}
          <Attending />
=======
        {this.state.concert.map(c => <li key={c.id}> {c.name}</li>)}
        {this.state.concert.map(c => <li key={c.id}> {c.description}</li>)}
        {this.state.concert.map(c => <li key={c.id}> {c.date}</li>)}
        {this.state.concert.map(c => <li key={c.id}> {c.genre}</li>)}
        {this.state.concert.map(c => <li key={c.id}> {c.ticket_url}</li>)}
        {this.state.concert.map(c => (
          <img key={c.id} src={c.image} alt={c.name} />
        ))}
        {this.state.venue.map(v => <li key={v.id}> {v.name}</li>)}
        {/* will go to venue page */}
        <button onClick={this.addUserToEventList}>attending</button>
        <button onClick={this.deleteUserFromEvent}>not attending</button>
>>>>>>> 4a2dca670f2b5b0eb6dcfdb64ff365fab8c3b02b
      </div>
    );
  }
}
export default Concert;
