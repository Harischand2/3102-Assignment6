import inquirer from "inquirer";
import qr from "qr-image";
import isUrl from 'is-url';
import fs from "fs";



inquirer.
prompt({
    type:"input",
    name: "url",
    validate: function(user_input){
        return isUrl(user_input) ? true : "Enter a valid url"; 
    },
    message:"Enter a url",
})
.then((answer)=>{
    let user_input = answer.url;
    convertToQR(user_input);
})
.catch((error)=>{
    console.log("error: ", error);
})

function convertToQR(user_input){
    let qr_png = qr.image(user_input, {type:'png'});
    qr_png.pipe(fs.createWriteStream('qr_code.png'));
    fs.writeFile('url.txt', user_input, (err)=>{
        if(err) throw err;
    })
}