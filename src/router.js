var riot = require('riot');

require('riot-router');
var Route = riot.router.Route;
var DefaultRoute = riot.router.DefaultRoute;
var NotFoundRoute = riot.router.NotFoundRoute;
var RedirectRoute = riot.router.RedirectRoute;

riot.router.routes([
    new DefaultRoute({tag: 'home'}),
    new Route({tag: 'about'}),
    new Route({path:'sign/in', tag: 'sign-in'}),
    new Route({path:'sign/out', tag: 'sign-out'}),
    new NotFoundRoute({tag: 'not-found'})
]);

module.exports = riot.router;
