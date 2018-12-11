var friends = require("../data/app");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {

        var match = {
            name: "",
            photo: "",
            startDif: 1000
        };

        // grab the result of the user"s survey POST and parse
        var uD = req.body;
        var uS = uD.scores;

        // difference between user and database user's score 
        var difference = 0;

        // loop all friends in database
        for (var i = 0; i < friends.length; i++) {
            difference = 0;
            // loop all scores of each friend
            for (var k = 0; k < friends[i].scores[k]; k++) {
                // difference between scores and sum it
                difference += Math.abs(parseInt(uS[k]) - parseInt(friends[i].scores[k]));
                if (difference <= match.startDif) {
                // reset match 
                match.name = friends[i].name;
                match.photo = friends[i].photo;
                match.startDif = difference;
                }
            }
        }
    // save user's data to the database
    friends.push(uD);
    // return JSON
    res.json(match);
    });
};

