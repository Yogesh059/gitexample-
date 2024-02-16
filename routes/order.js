const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Order = require("../models/Order");
const router = require("express").Router();

//Create

router.post("/", async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);

    } catch (e) {
        res.status(500).json(e);

    }
})


// Update
router.put("/:id", async (req, res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (e) {
        res.status(500).json(e);
    }
})

//Delete
router.delete("/:id", async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted");
    } catch (e) {
        res.status(500).json(e);
    }
})


//Get User Order

router.get("/find/:id", async (req, res) => {
    try {
        const orders = await Order.find({userId:req.params.id});
        res.status(200).json(orders);
    } catch (e) {
        res.status(500).json(e);
    }
})

//Get All

router.get("/:id", async (req, res) => {
    try {
        const orders = await Order.find({_id:req.params.id});
        res.status(200).json(orders);
    } catch (e) {
        res.status(500).json(e);
    }
});

// Get All Orders

router.get("/",async(req,res)=>{
    try{
        const orders=await Order.find();
        res.status(200).send(orders);
    }catch(e){
        res.status(500).json(e);
    }
})

// Get Monthly Income

router.get("/income", async (req, res) => {
    console.log("hiii")
    const productId=req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    console.log("pid",productId)
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth },...(productId && {
                products:{$elemMatch:{productId:productId}}
            } ) } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },

            }
        ]);
        console.log("inc",income);
        res.status(200).json(income);
    } catch (e) {
        res.status(500).json(e);
    }
})


module.exports = router;