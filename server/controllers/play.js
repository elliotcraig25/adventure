module.exports = {
    getPlayInfo: async (req, res)=>{
        // console.log(req.query.aID);
        const db = req.app.get('db');
        let titleInfo = await db.play.getTitleInfo(
            {id: req.params.id}
        )
        titleInfo = titleInfo[0];
        // console.log(`the info`, {titleInfo}); 
        // res.status(200).send(titleInfo);
        res.status(200).send(titleInfo);
    },
    getOption: async (req, res)=>{
        const {aid, zid} = req.params;
        // console.log(aid);
        // console.log(zid);
        const db = req.app.get('db');
        let optionInfo = await db.play.getAdventureInfo(
            [aid, zid]
        )
        optionInfo = optionInfo[0];
        res.status(200).send(optionInfo)
        // console.log('is it hitting?', req.params.zid);
        // console.log('is it hitting2?', req.params.oid); 
    }
}