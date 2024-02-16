const router=require("express").Router();
const stripe=require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", (req,res)=>{
    console.log("no")
    stripe.charges.create(
        {
            source:req.body.tokenId,
            amount:req.body.amount,
            currency:"INR",
        },
        
        (stripeErr,stripeRes)=>{
            if(stripeErr){
                console.log("hii")
                res.send(true)
                // res.status(500).json(stripeErr);
            }else{
                console.log("by")
                re.status(200).json(stripeRes);
            }
        }
    )
})


module.exports=router;