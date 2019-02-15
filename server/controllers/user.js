const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res)=>{
        const {username, password} = req.body;
        const {session} = req;
        const db = req.app.get('db');
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        // console.log({hash});
        let newUser = await db.user.register(
            {user: username, pass: hash}
        );
        newUser = newUser[0];
        // console.log({newUser});  
        // console.log({session});     
        session.user = {...newUser};
        // console.log({session});  
        res.status(201).send(session.user);
    },
    getUser: (req, res)=>{

    }
};