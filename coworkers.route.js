var Coworker = require("./coworker.model");
var Vote = require("./vote.model");
var auth = require("./auth-middleware");

module.exports = function(app) {
    //create coworker
    app.post("/api/v1/coworkers", auth, function(request, response, next){
        try {
           var coworker = new Coworker({
                name: request.fields.name,
                sallingID: request.fields.sallingID,
                department: request.fields.department
            }).save();

            response.status(201)
            response.json(coworker);
        } catch (error) {
            return next(error)
        }
    })

    //get all coworkers
    app.get("/api/v1/coworkers", async function(request, response, next) {
        try {
            var result = await Coworker.find();

            var output = {
                count: result.length,
                next: `${request.protocol}://${request.hostname}${ request.hostname == "localhost" ? ":" + process.env.PORT : "" }${ request.url }?offset=20`,
                previous: null,
                url: `${request.protocol}://${request.hostname}${ request.hostname == "localhost" ? ":" + process.env.PORT : "" }${ request.url }`,
                results: result,
            }
            response.json(output);
        } catch (error) {
            return next(error)
        }
    });
    
    //get single coworker by id
    app.get("/api/v1/coworkers/:id", async function(request, response, next) {
        try {
            var result = await Coworker.findById(request.params.id);
            
            if(!result) {
                response.status(404);
                response.end();
                return;
            }
            
            response.json(result);
        } catch (error) {
            return next(error)
        }
    });

    //update coworker info
    app.patch("/api/v1/coworkers/:id", auth, async function(request, response, next) {
        try {
            var { name, sallingID } = request.fields;
            var updateObject = {};

            if (name) updateObject.name = name;
            if (sallingID) updateObject.sallingID = sallingID;
            if (department) updateObject.department = department;

            await Coworker.findByIdAndUpdate(request.params.id, updateObject);
            
            
            var coworker = await Coworker.findById(request.params.id);

            response.status(200);
            response.json(coworker)
        } catch (error) {
            return next(error)
        }
    });

    //delete a coworker
    app.delete("/api/v1/coworkers/:id", auth, async function(request, response, next){
        try {
            await Coworker.findByIdAndRemove(request.params.id);
            response.status(200)
            response.end();
        } catch (error) {
            return next(error)
        }
    })

    //Create a vote
    app.post("/api/v1/votes", function(request, response, next){
        try {
           var vote = new Vote({
                vote: request.fields.vote,
                voter: request.fields.voter,
                
            }).save();

            console.log(request.fields);

            response.status(201)
            response.json(vote);
        } catch (error) {
            return next(error)
        }
    })

    //get all votes
    app.get("/api/v1/votes", async function(request, response, next) {
        try {
            var vote_result = await Vote.find();

            var output = {
                count: vote_result.length,
                voting: vote_result
            }
            response.json(output);
        } catch (error) {
            return next(error)
        }
    });

    //delete a vote
    app.delete("/api/v1/votes/:id", auth, async function(request, response, next){
        try {
            await Vote.findByIdAndRemove(request.params.id);
            response.status(200)
            response.end();
        } catch (error) {
            return next(error)
        }
    })
};