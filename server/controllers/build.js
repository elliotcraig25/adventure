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
        let {prop, val, aID} = req.body;
        if(prop === 'z'){
            const db = req.app.get('db'); 
            let rowToChangeAID = aID;
            db.build.editZ([val, prop, rowToChangeAID])
            .then(response=>res.sendStatus(200)); 
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
            if(columnToChange === 'z'){
                const db = req.app.get('db');
                db.build.editZ([val, rowToChangeZID, rowToChangeAID])
                .then(response=>res.sendStatus(200));
            }else if(columnToChange === 'a'){
                const db = req.app.get('db');
                db.build.editA([val, rowToChangeZID, rowToChangeAID])
                .then(response=>res.sendStatus(200));
            }else if(columnToChange === 'b'){
                const db = req.app.get('db');
                db.build.editB([val, rowToChangeZID, rowToChangeAID])
                .then(response=>res.sendStatus(200));
            }else if(columnToChange === 'c'){
                const db = req.app.get('db');
                db.build.editC([val, rowToChangeZID, rowToChangeAID])
                .then(response=>res.sendStatus(200));
            }else if(columnToChange === 'd'){
                const db = req.app.get('db');
                db.build.editD([val, rowToChangeZID, rowToChangeAID])
                .then(response=>res.sendStatus(200));
            }
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
        // console.log(newAdventure[0].adventure_id)
        db.build.insert_new_row(['z', newAdventure[0].adventure_id])
        .then(response=>res.sendStatus(200))
        .catch(err=>{
            res.sendStatus(500)
            console.log(err) 
        })
    },
    addTitle: async (req, res)=>{
        const {adventure_id, adventureTitle} = req.body;
        const db = req.app.get('db');
        db.build.addToAll(adventure_id)
        .then(res=>res.sendStatus(200))
        .catch(err=>{
            res.sendStatus(500)
            console.log(err)
        })
        db.build.addTitle([adventure_id, adventureTitle])
        .then(res=>res.sendStatus(200))
        .catch(err=>{
            res.sendStatus(500)
            console.log(err)
        })
    },
    changeType: (req, res)=>{
        const {loopInfo, selectedBranch, aID} = req.body;
        console.log({loopInfo});
        console.log({selectedBranch});
        console.log({aID});
        const db = req.app.get('db');
        db.build.changeToLoop([loopInfo, selectedBranch, aID])
        .then(res=>res.sendStatus(200))
        .catch(err=>{
            res.sendStatus(500)
            console.log(err)
        })
    }
}