# Attempt at a ReactJS based them for Wordpress

## Implementation

* ReactJS
* Reflux
* Backbone

## Running

Install dependencies with npm. You should also have browser-sync installed globally.

```
npm install
```

This project comes with a gulp task to compile less and JS files (using browserify), as well as a watch task to rebundle and update via browser-sync.

To bundle JS and compile LESS:
```
gulp build
```

For watch & browser-sync:
```
gulp watch
```

TODO: Add default task set.

## Credit

Much of the Gulp task workflow was created by [Dan Tello](https://github.com/greypants/gulp-starter).
