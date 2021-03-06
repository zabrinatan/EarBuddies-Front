import React, { PureComponent as Component } from "react";
import Concerts from "./components/concerts/Concerts";
import "./index.css";
import axios from "axios";
import Search from "./components/Search/Search";
import _ from "lodash";
import Footer from "./components/Footer/Footer";
import CircularProgress from "material-ui/CircularProgress";


class App extends Component {
  state = {
    lat: "-33.871478599999996",
    lon: "151.20472279999998",
    // lat: null,
    // lon: null,
    events: [],
    genres: [],
    loading: false,
    watchID: "",
    token: null
  };

  componentWillUnmount = () => {
    navigator.geolocation.clearWatch(this.state.watchID);
  };

  componentDidMount = async () => {
    await this.getLocation();

    console.log("lat: ", this.state.lat);
    console.log("lon: ", this.state.lon);

    axios
      .get("https://earbuddies1.herokuapp.com/venues.json", {
        params: {
          latlon: `${this.state.lat},${this.state.lon}`
        }
      })
      .then(res => {
        console.log("res: ", res);
        res.data.map(item => {
          return item.events.map(event => {
            return this.setState({
              //Saving all events from all venues to this.state.events
              events: [...this.state.events, event],
              genres: [...this.state.genres, event.genre]
            });
          });
        });
      })
      .then(() => {
        this.setState({
          loading: false
        });
      });
  };

  onInputSetState = async (id, value) => {
    await this.setState({
      loading: true
    });

    if (id === "genre") {
      axios
        .get(`https://earbuddies1.herokuapp.com/events.json?genre=${value}`)
        .then(res => {
          console.log(res);
          res.data.map(event => {
            return this.setState({
              //Saving all events from all venues to this.state.events
              events: res.data,
              genres: [...this.state.genres, event.genre]
            });
          });
        })
        .then(() => {
          this.setState({
            loading: false
          });
        });
    }

    if (id === "name") {
      axios
        .get(`https://earbuddies1.herokuapp.com/events.json?name=${value}`)
        .then(res => {
          console.log(res);
          res.data.map(event => {
            return this.setState({
              //Saving all events from all venues to this.state.events
              events: res.data,
              genres: [...this.state.genres, event.genre]
            });
          });
        })
        .then(() => {
          this.setState({
            loading: false
          });
        });
    }
  };

  getLocation = () => {
    this.setState({
      loading: true
    });

    const nav = navigator.geolocation;
    nav.getCurrentPosition(position => {
      this.setState({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
    });

    const watchID = navigator.geolocation.watchPosition(position => {
      if (
        this.state.lat !== position.coords.latitude &&
        this.state.lon !== position.coords.longitude
      ) {
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          watchID
        });
      }
    });
  };

  render() {
    if (this.state.loading) {
      return <CircularProgress size={60} thickness={7} />;
    }

    return (
      <div>
        <Search
          genres={_.uniq(this.state.genres)}
          onSubmit={this.onInputSetState}
        />
        <div style={styles.main}>
          <Concerts concerts={this.state.events} history={this.props.history} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;

const styles = {
  main: {
    maxWidth: "960px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};
