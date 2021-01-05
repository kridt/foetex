var Coworker = require("./coworker.model")

module.exports = function(app) {
    //create coworker
    app.post("/api/v1/coworkers", function(request, response, next){
        try {
           var coworker = new Coworker({
                name: request.fields.name,
                sallingID: request.fields.sallingID
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
            response.json(result);
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
    app.patch("/api/v1/coworkers/:id", async function(request, response, next) {
        try {
            var { name, sallingID } = request.fields;
            var updateObject = {};

            if (name) updateObject.name = name;
            if (sallingID) updateObject.sallingID =sallingID;

            await Coworker.findByIdAndUpdate(request.params.id, updateObject);
            
            
            var coworker = await Coworker.findById(request.params.id);

            response.status(200);
            response.json(coworker)
        } catch (error) {
            return next(error)
        }
    });

    //delete a coworker
    app.delete("/api/v1/coworkers/:id", async function(request, response, next){
        try {
            await Coworker.findByIdAndRemove(request.params.id);
            response.status(200)
            response.end();
        } catch (error) {
            return next(error)
        }
    })

};