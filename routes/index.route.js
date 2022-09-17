let user = require('./user.route');
let admin = require('./admin.route');

function route(app){
    // app.use("/admin",admin);
    app.use("/",user);
}

module.exports = route;