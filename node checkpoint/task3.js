const fs=require("fs")
fs.writeFile("example.txt","This is a text",()=>console.log("File created"));

const my=require('./myModule')
my.Add()