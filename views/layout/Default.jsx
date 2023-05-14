const React = require("react");
const Nav = require("../components/Nav");

const myStyle = {
  container: {
    backgroundImage:
      "url(https://media.giphy.com/media/U3qYN8S0j3bpK/giphy.gif)",
    color: "white",
    textAlign: "center",
    // a: {
    //   color: "#84c7d7",
    // },
  },
};

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="/app.css" />
        </head>
        <body style={myStyle.container}>
          <Nav link={this.props.link} text={this.props.text} />
          <h1>{this.props.title}</h1>
          {this.props.children}
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;
