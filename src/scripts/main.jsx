var React = require('react');
var Reflux = require('reflux');
var ReactRouter = require('react-router');
var App = require('./components/App.jsx');

var routes = (
        <ReactRouter.Route handler={App}>
        </ReactRouter.Route>
);


ReactRouter.run(routes, function (Handler) {
      React.render(<Handler/>, document.getElementById('app'));
});
