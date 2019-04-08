import React, { Component } from "react";

import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>CURRENT ENVIRONMENT: {process.env.REACT_APP_ENV}</p>
        <section>
          {this.props.data.cockpit_projects &&
            this.props.data.cockpit_projects.map(cockpit_project => (
              <article key={cockpit_project.project_title}>
                <header>
                  <h2>{cockpit_project.project_links}</h2>
                </header>
                <p>{cockpit_project.project_icons}</p>
              </article>
            ))}
        </section>
      </div>
    );
  }
}

export default compose(
  graphql(gql`
    query {
      cockpit_projects {
        project_id
        project_type
        project_name
        project_title
        project_description_lite
        project_description
        project_icons
        project_links
        project_created
        project_updated
      }
    }
  `)
)(App);
