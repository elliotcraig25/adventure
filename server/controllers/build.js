module.exports = {
    doesZIDExist: (req, res)=>{
        const db = req.app.get('db');
        let {movingTo, aID} = req.body
        // console.log(movingTo)
        db.build.does_z_id_exist([movingTo, aID])
        .then(response=>res.status(200).send(response))
        .catch(err=>{
            res.sendStatus(500)
            console.log(err) 
        })
    },
    createNewRow: (req, res)=>{
        const db = req.app.get('db');
        let {newZID, aID} = req.body
        // console.log(`this is movingTo`, newZID)
        db.build.insert_new_row([newZID, aID])
        .then(response=>res.sendStatus(200))
        .catch(err=>{
            res.sendStatus(500)
            console.log(err) 
        })
    }, 
    infoToDatabase: async (req, res)=>{
        const db = req.app.get('db');
        let {prop, val, aID} = req.body;
        if(prop === 'z'){
            console.log('just z')
        }else{
            let propSplit = prop.split('');
            let columnToChange = propSplit.pop();
            let rowToChangeZID = propSplit.splice(0, propSplit.length - 1).join('');
            let rowToChangeAID = aID;
            console.log({columnToChange});
            console.log({rowToChangeZID});
            console.log({rowToChangeAID});
            console.log({val});
            // await db.build.insertIntoZABCD(
            //     [columnToChange, rowToChangeZID, rowToChangeAID, val]
            // )
            // db.build.doesZIDExist([rowToChangeZID, rowToChangeAID])
            // .then(console.log(`does exist`))
            // .catch(console.log(`doesn't exist`))
        }
    },
    createAdventure: async (req, res)=>{
        const {userMakingTheAdventure} = req.body;
        const db = req.app.get('db');
        let newAdventure = await db.build.createAdventure(
            [userMakingTheAdventure] 
        )
        // console.log({newAdventure})
        res.status(200).send(newAdventure[0]);
    }
}