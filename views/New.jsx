const React = require("react");

class New extends React.Component {
  render() {
    return (
      <div>
        <h1>Enter a New Log!</h1>
        <form action="/logs" method="POST">
          Title: <input type="text" name="title" />
          <br />
          <br />
          Entry: <input type="textarea" name="entry" />
          <br />
          <br />
          Ship is Broken:
          <input type="checkbox" name="shipIsBroken" />
          <br />
          <br />
          <input type="submit" value="Create Log" />
        </form>
      </div>
    );
  }
}

module.exports = New;
