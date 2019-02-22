module.exports = {
    infoToDatabase: (req, res)=>{
        const db = req.app.get('db');
        let {prop, val} = req.body;
        if(prop === 'z'){
            console.log('just z')
        }else{
            let propSplit = prop.split('');
            let columnToChange = propSplit.pop();
            let rowToChange = propSplit.splice(0, propSplit.length - 1).join('')
            console.log({columnToChange});
            console.log({rowToChange});
            console.log({val});
        }
        
    }
}