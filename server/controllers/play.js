module.exports = {
    getPlayInfo: async (req, res)=>{
        // console.log(req.query.aID);
        const db = req.app.get('db');
        let titleInfo = await db.play.getTitleInfo(
            {id: req.params.id}
        )
        titleInfo = titleInfo[0];
        console.log(`the info`, {titleInfo}); 
        // res.status(200).send(titleInfo);
        res.status(200).send(titleInfo);
    }
}