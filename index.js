const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('express-flash');
const pg = require("pg");
const Pool = pg.Pool;
const app = express();
var _ = require('lodash');
const reggy = require('./factory');


app.use(session({
    secret: "<My flash>",
    resave: false,
    saveUninitialized: true
}));


let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://thatodonvulo:pg123@localhost:5432/registrations';


const pool = new Pool({
    connectionString,
});



app.use(flash())
app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res){
    res.render('index');
});

const reges = reggy(pool)
app.post('/reg_numbers', async function(req, res){

    var code = _.upperCase(req.body.regNumberEntered);
    var duplicate = await reges.checkIfRegistrationExist(code)
    // console.log(code)
    let regs
    if(code === ""){
        req.flash('info', "Please enter number plate");
    }
    else if ((!(/C[BST]\s\d{3}-\d{3}$|C[BST]\s\d{3}\d{3}$|C[BST]\s\d{3}$|C[BST]\s\d{3}\s\d{3}$|C[BST] \d{3,6}/.test(code)))){
        req.flash('info', "Please enter the correct number plate");      
    }
    else if(duplicate !== 0){
        req.flash('info', "Number is already entered!!")
    }
   else{

    await reges.insertingNumberPlates(code);
    }
    res.render('index',{
        msg: await reges.allRegistrations() 
    });
});

app.get('/reg_numbers' , async function(req, res){
    var code = req.query.town;
   
  let registrations =  await reges.filter(code);

// console.log(registrations)
    res.render('index',{
        msg: registrations
    });
});

app.get('/reset', async function(req, res){
    await reges.deletesNumberPlates();
    res.render('index');
});


const PORT = process.env.PORT || 3031;
app.listen(PORT, function(){
    console.log('App starting on PORT', PORT);
});

