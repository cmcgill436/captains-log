const React = require("react");
const DefaultLayout = require("./layout/Default");

class New extends React.Component {
  render() {
    return (
      <DefaultLayout title="Enter a New Log" link="/" text="Home">
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
      </DefaultLayout>
    );
  }
}

module.exports = New;
