const React = require("react");
const DefaultLayout = require("./layout/Default");

class Show extends React.Component {
  render() {
    const log = this.props.log;
    return (
      <DefaultLayout title="Show Page" link="/" text="Home">
        The {log.title} is {log.entry} <br />
        {log.shipIsBroken ? `The ship is broken` : `The ship is fine`}
      </DefaultLayout>
    );
  }
}

module.exports = Show;
