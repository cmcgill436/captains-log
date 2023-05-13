const React = require("react");
const DefaultLayout = require("./layout/Default");

class New extends React.Component {
  render() {
    return (
      <DefaultLayout title="New Page" link="/logs" text="Home">
        <h1>Enter a New Log!</h1>
        <form action="/logs" method="POST">
          Title: <input type="text" name="title" />
          Entry: <input type="textarea" name="entry" />
          Ship is Broken:
          <input type="checkbox" name="shipIsBroken" />
          <input type="submit" value="Create Log" />
        </form>
      </DefaultLayout>
    );
  }
}

module.exports = New;
