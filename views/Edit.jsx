const React = require("react");
const DefaultLayout = require("./layout/Default");

class Edit extends React.Component {
  render() {
    const log = this.props.log;
    return (
      <DefaultLayout title="Edit Page" link="/logs" text="Home">
        <form action={`/logs/${log._id}?_method=PUT`} method="POST">
          Title: <input type="text" name="title" defaultValue={log.title} />
          <br />
          <br />
          Entry: <input type="textarea" name="entry" defaultValue={log.entry} />
          <br />
          <br />
          Ship is broken:
          {log.shipIsBroken ? (
            <input type="checkbox" name="shipIsBroken" defaultChecked />
          ) : (
            <input type="checkbox" name="shipIsBroken" />
          )}
          <br />
          <br />
          <input type="submit" value="Submit Changes" />
        </form>
      </DefaultLayout>
    );
  }
}

module.exports = Edit;
