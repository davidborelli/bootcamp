import React, { Component } from "react";
import TechItem from "./TechItem";

class TechList extends Component {
  // static defaultProps = {
  //   tech: "Oculto"
  // };

  // static propTypes = {
  //   tech: PropTypes.string
  // }

  state = {
    newTech: "",
    techs: []
  };

  // As soon as the component appears on screen
  componentDidMount() {
    const techs = localStorage["techs"];

    this.setState({
      techs: techs ? JSON.parse(techs) : []
    });
  }

  // Runs whenever props or state changes
  componentDidUpdate(_, prevState) {
    // prevProps, prevState old Properties
    // this.porps,
    // this.state

    if (prevState.techs !== this.state.techs) {
      localStorage["techs"] = JSON.stringify(this.state.techs);
    }
  }

  //Executed when component no longer exists
  componentWillUnmount() {}

  handleInputChange = e => {
    this.setState({
      newTech: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ""
    });
  };

  handleDelete = tech => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem
              key={tech}
              tech={tech}
              onDelete={() => this.handleDelete(tech)}
            />
          ))}
        </ul>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;
