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
          {this.props.data.posts &&
            this.props.data.posts.map(post => (
              <article key={post.id}>
                <header>
                  <h2>{post.title}</h2>
                </header>
                <p>{post.description}</p>
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
