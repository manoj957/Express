const express = require('express');
const zod= require('zod');
const schema= zod.array(zod.number())
const testschema= zod.object({
    "email": zod.string(),
    "country": zod.literal("IN").or(zod.literal("US"))
})
const testschemas= zod.array(zod.string())
const app = express();

app.use(countRequests,express.json());

app.get('/health-checkup-dumb',(req,res)=>{
    const username =req.headers.username;
    const password =req.headers.password;
    const kidneyId= req.query.kidneyId;

    if(username!='rahul' && password!="pass"){
        res.status(400).json({"msg":"Wrong inputs"})
    }
    if(kidneyId!=2 && kidneyId!=1){
        res.status(400).json({"msg":"Wrong kidneys inputs"})
    }
    res.json({"msg":"Ok Cool"})
})

app.get('/health-checkup',userValidator,kidneyValidator,(req,res)=>{
    res.send("Your health is good")
})

app.get('/kidney-check',userValidator,kidneyValidator,(req,res)=>{
    res.send("Your kidney is good")
})

app.get('/test-check',(req,res,next)=>{
    res.json("PAddeesswd")
})


app.post('/health-checkups',(req,res)=>{
    const kidney =req.body.kidneys;
    console.log(kidney)
    const response= schema.safeParse(kidney)
    console.log(response)
    const kidneyLength =kidney.length;

    if(!response.success){
        res.status(411).json({
            msg:"error"
        })
    } else {
        res.send({
            response
        })
    }
    // res.send("You have "+kidneyLength+" kidneys.")
    
})

function validateInput(arr){
    const arrayValue= testschemas.safeParse(arr)
    
    console.log(arrayValue.data)
}

let noofreq=0;
function countRequests(req,res,next) {
    while(noofreq<=5){
        noofreq++;
        console.log(noofreq) 
    }
    next();
}

function userValidator(req,res,next) {
    const username =req.headers.username;
    const password =req.headers.password;
   
    if(username!='rahul' || password!="test"){
        res.status(400).json({"msg":"Wrong inputs"})
    } else {
        console.log("req1")
        next();
    }
    
}

function kidneyValidator(req,res,next) {
    const kidneyId= req.query.kidneyId;
    if(kidneyId!=2 && kidneyId!=1){
        res.status(400).json({"msg":"Wrong kidneys inputs"})
    } else {
        console.log("req2")
        next();
    }
}

app.use(function(err,req,res,next){
    res.sendStatus(500).send('An internal error occured')
})

validateInput(["sf","sfsdxzc"])
app.listen(3000);