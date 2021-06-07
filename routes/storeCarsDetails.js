var express = require('express');
const {MongoClient} = require('mongodb');
var router = express.Router();
const authController = require('../controllers/authControllers');


/* POST method to store cars details to mangodb */
router.post('/', authController.ensureAuthorized, async function(req, res, next) {
    let newListing = req.query.carDetails;
        /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
         const uri = "mongodb+srv://Srinivasan:Srini@9965@cluster0.vixo4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
 

         const client = new MongoClient(uri);
      
         try {
             // Connect to the MongoDB cluster
             await client.connect();
      
             // Make the appropriate DB calls
            // let data =  await  listDatabases(client);

            // Add car details into db
            let insertId =  await  createListing(client, JSON.parse(newListing));

            console.log('datadatadatadata', insertId)
            res.status(200)
            .json({
                status: 'Success',
                data: insertId,
                message: 'Car details successfully created'
            })
      
         } catch (e) {
             console.error(e);
             res.status(200)
             .json({
                 status: 'Error',
                 message: e.message
             })
         } finally {
             await client.close();
         }
});

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

async function createListing(client, newListing){
    const result = await client.db("sample_airbnb").collection(`${newListing['manufacturer']}`).insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
    return result.insertedId;
}

module.exports = router;