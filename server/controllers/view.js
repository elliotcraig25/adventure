module.exports = {
    getCategoryItems: async (req, res)=>{
        const {ele} = req.body;
        // console.log(ele)
        const db = req.app.get('db');
        let category = await db.view.getCategories(
            {category_name: ele}
        );
        console.log({category});
        res.status(200).send(category);
    }
}