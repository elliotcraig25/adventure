module.exports = {
    testa: async (req, res)=>{
        const db = req.app.get('db');
        let info = await db.tests.testa();
        info = info[0];
        console.log({info});
        res.status(200).send(info);
    },
    getCategoryItems: async (req, res)=>{
        const {ele} = req.body;
        // console.log(ele)
        const db = req.app.get('db');
        let category = await db.view.getCategories(
            {category_name: ele}
        );
        console.log({category});
    }
}