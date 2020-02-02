//Connor Birnie
//Adimo Technical Task
//01/02/2020
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

request.get('https://cdn.adimo.co/clients/Adimo/test/index.html', function(error, response, body) {

    if (response.statusCode != 200) { //error handling to check the resource is found tried using .on error but couldnt get it to work.
        console.log('Resource not found', 'Status Code:', response.statusCode, ) // showing error and displaying status Code
    } else {
        console.log("Application Starting");
        console.log('statusCode:', response && response.statusCode); //getting status Code to make sure loaded
        const $ = cheerio.load(body);
        var cheeseObject = {}; // Object to store each item of cheese
        const count = [],
            cheeseList = [] // array to store all of cheese and count for total of all cheese

        $('.item').each(function(i, elem, ) { //Loop code already given
            //assigning each object to array in loop
            cheeseList[i] = {
                //getting each item from the DOM and adding to JSON obj
                title: cheeseObject["title"] = $(this).find('h1').text(),
                ImageUrl: cheeseObject["ImgUrl"] = $(this).find('img').attr('src'),
                price: cheeseObject["price"] = $(this).find('.price').text(),
                oldPrice: cheeseObject["oldPrice"] = $(this).find('.oldPrice').text(),
            }

            count.push(JSON.stringify(cheeseObject["price"]).replace(/[^0-9.]/g, '')); //replacing unwanted characters and pushing to array 

        });

        const total = (a, b) => a + b;
        let totalArray = count.map(Number); //converts to int
        let totalCount = totalArray.reduce(total); //reducing array by applying arrow function to calculate total.


        let sum = {
            "total": cheeseList.length
        }; // creating Total json Obj to push
        let avg = {
            "Average": totalCount / cheeseList.length
        }; // creating average json Obj to push
        cheeseList.push(sum, avg); // pushing to orginal array
        let jsonDoc = JSON.stringify(cheeseList, null, 3); //formatting correctly
        fs.writeFileSync('CheeseList.json', jsonDoc); //writing the .json file
        console.log(jsonDoc); //displaying full document in Console.

    }

});