import React, { PureComponent as Component } from "react";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import AddPhoto from "./AddPhoto";
import axios from "axios";
import _ from "lodash";
import jwtDecoder from "jwt-decode";

//const USER_URL = "https://earbuddies1.herokuapp.com/users/14.json";
const style = {
  margin: 15
};

// const token = localStorage.getItem("jwtToken");
// const user = jwtDecoder(token);

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      name: "",
      hometown: "",
      bio: "",
      interests: "",
      email: "",
      password: "",
      password_confirmation: "",
      success: ""
    };
  }

  componentDidMount = () => {
    console.log(this.props)
    this.fetchUser();
  };

  fetchUser = () => {
    // Fat arrow functions do not break the connection to this
    const user = jwtDecoder(this.props.token);
    console.log(user);
    axios({
      url: `https://earbuddies1.herokuapp.com/users/${user.sub}.json`,
      method: "get",
      headers: {
        authorization: `Bearer ${this.props.token}`
      }
    }).then(res => this.setState({ user: res.data }));
  };

  _handleSubmit = e => {
    e.preventDefault();
    let url = `https://earbuddies1.herokuapp.com/user/${
      this.state.user.id
    }.json`;
    console.log(url);

    axios({
      url: url,
      method: "patch",
      headers: {
        authorization: `Bearer ${this.props.token}`
      },
      data: {
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        name: this.state.name,
        hometown: this.state.hometown,
        bio: this.state.bio,
        interests: this.state.interests
      }
    }).then(res =>
      this.setState({ success: "Success your account was updated!" })
    );
  };

  _handleChange = event => {
    if (event.target.id === "name-field") {
      this.setState({
        name: event.target.value
      });
    }
    if (event.target.id === "hometown-field") {
      this.setState({
        hometown: event.target.value
      });
    }
    if (event.target.id === "bio-field") {
      this.setState({
        bio: event.target.value
      });
    }
    if (event.target.id === "interests-field") {
      this.setState({
        interests: event.target.value
      });
    }
    if (event.target.id === "password-field") {
      this.setState({
        password: event.target.value
      });
    }
    if (event.target.id === "password-confirmation-field") {
      this.setState({
        password_confirmation: event.target.value
      });
    }
  };

  render() {
    if (!this.state.user) {
      return <h2>Loading...</h2>;
    }

    this.setState({
      name: this.state.user.name,
      hometown: this.state.user.hometown,
      bio: this.state.user.bio,
      interests: this.state.user.interests,
      email: this.state.user.email
    });

    return (
      <div>
        <div>
          <form onSubmit={this._handleSubmit}>
            <AppBar title="Edit Profile" />
            <TextField
              id="name-field"
              hintText="Name"
              floatingLabelText="Name"
              defaultValue={this.state.user.name}
              onChange={this._handleChange}
            />
            <br />
            <TextField
              id="hometown-field"
              hintText="Hometown"
              floatingLabelText="Hometown"
              defaultValue={this.state.user.hometown}
              onChange={this._handleChange}
            />
            <br />
            <TextField
              id="bio-field"
              hintText="Biography"
              floatingLabelText="Biography"
              defaultValue={this.state.user.bio}
              onChange={this._handleChange}
            />
            <br />
            <TextField
              id="interests-field"
              hintText="Interests"
              floatingLabelText="Interests"
              defaultValue={this.state.user.interests}
              onChange={this._handleChange}
            />
            <br />
            <TextField
              id="password-field"
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={this._handleChange}
            />
            <br />
            <TextField
              id="password-confirmation-field"
              type="password"
              hintText="Password confirmation"
              floatingLabelText="Password Confirmation"
              onChange={this._handleChange}
            />
            <br />

            <br />
            <RaisedButton
              label="Submit"
              type="submit"
              primary={true}
              style={style}
            />
          </form>
        </div>

        <p>{this.state.success}</p>
        <AddPhoto user={this.state.user} />
      </div>
    );
  }
}

export default EditProfile;
