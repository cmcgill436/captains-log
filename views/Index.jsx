const React = require("react");
const DefaultLayout = require("./layout/Default");

class Index extends React.Component {
  render() {
    const { logs } = this.props;
    return (
      <DefaultLayout
        title="Captains Log"
        link="/logs/new"
        text="Enter a new log here"
      >
        <ul>
          {logs.map((log, i) => {
            return (
              <li key={i}>
                Title: <a href={`/logs/${log._id}`}>{log.title}</a>
                <br />
                {log.shipIsBroken ? `The ship is broken` : `The ship is fine`}
                <br />
                <br />
                <a href={`logs/${log._id}/edit`}>Edit this Log</a>
                <form action={`logs/${log._id}?_method=DELETE`} method="POST">
                  <input type="submit" value="DELETE" />
                </form>
                <br />
              </li>
            );
          })}
        </ul>
      </DefaultLayout>
    );
  }
}

module.exports = Index;
