/* 
A express server which will handle API requests coming in and respond back with
a json object. It will use body parser as well as cors
*/

const OpenAI =require ('openai');
const { Configuration, OpenAIApi } = OpenAI;



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port =3001;

const configuration = new Configuration({
    organization: "org-kX90cdIF7irbG8o2lB5Fynsm",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();

app.use(bodyParser.json());
app.use(cors());

// define routes
app.post('/', async (req, res)=> {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Pretend you are Ogwel. Answer with motivational conent.
        Ogwel:How can I help you today?
        Person:I want some motivation.
        Ogwel: You are amazing, You can achieve anything you want to  as long as you put in the work.
        Person:${message}?
        Ogwel`,
        max_tokens: 100,
        temperature: 0,
      });
      console.log(response.data)
      if (response.data.choices[0].text){
        res.json({message:response.data.choices[0].text});
    }
    
    });

app.listen(port,()=>{
    console.log('Example app listening');

});