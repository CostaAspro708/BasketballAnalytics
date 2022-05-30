var express = require('express');
var router = express.Router();

const request = require('request-promise');
const cheerio = require('cheerio');
const pretty = require("pretty");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET boxspread for player. */
router.get('/players/:let/:id', async function(req, res, next) {
  var let = req.params.let;
  var id = req.params.id;
  const scrapedData = [];
  const result = await request.get("https://www.basketball-reference.com/players/"+let+"/"+id+"/gamelog/2022");
  const $ = cheerio.load(result);
  //console.log(pretty($.html()));
  $(".thead").remove();
  const table = $("body > div .table_container > table > tbody > tr").each((index, element) => {
    const tds = $(element).find("td");
    let date = $(tds[1]).text();
    date = new Date(date);
    const team = $(tds[3]).text();
    const homeaway = $(tds[4]).text();
    const opponent = $(tds[5]).text();
    const win_loss = $(tds[6]).text();
    let mp = $(tds[8]).text();
    mp = mp.replace(":", ".");
    const fg = $(tds[9]).text();
    const fga = $(tds[10]).text();
    const fgp = $(tds[11]).text();
    const three_made = $(tds[12]).text();
    const three_attempts = $(tds[13]).text();
    const three_percent = $(tds[14]).text();
    const ft = $(tds[15]).text();
    const fta = $(tds[16]).text();
    const ftp = $(tds[17]).text();
    const orb = $(tds[18]).text();
    const drb = $(tds[19]).text();
    const trb = $(tds[20]).text();
    const ass = $(tds[21]).text();
    const stl = $(tds[22]).text();
    const blk = $(tds[23]).text();
    const tov = $(tds[24]).text();
    const pf = $(tds[25]).text();
    const points = $(tds[26]).text();
   

    const tableRow = { date, team, homeaway, opponent, win_loss, mp, fg, fga, fgp, three_made, three_attempts, three_percent, ft, fta, ftp, orb, drb, trb, ass, stl, blk, tov, pf, points};
    scrapedData.push(tableRow);
});
  const image = $("body > #wrap > #info > #meta > .media-item > img").attr('src');
  console.log(image);
 
  //console.log(table.html()); 
  res.status(200).send({Data:scrapedData, Image:image});
});

/* GET all info for player. */
router.get('/info/players/:let/:id', async function(req, res, next) {
  const scrapedData = [];
  var let = req.params.let;
  var id = req.params.id;
  const result = await request.get("https://www.basketball-reference.com/players/"+let+"/"+id+".html");
  const $ = cheerio.load(result);
  const image = $("body > #wrap > #info > #meta > .media-item > img").attr('src');
  let name = $("body h1").text();
  name = name.slice(3);
  name = name.slice(0,-4);
  console.log(name);

  res.status(200).send({Data: {Image:image, Name:name}});
});

/* GET all players. */
router.get('/all', async function(req, res, next) {
  const scrapedData = [];
  const result = await request.get("https://www.basketball-reference.com/leagues/NBA_2022_per_game.html");
  const $ = cheerio.load(result);
  //console.log(pretty($.html()));
  $(".thead").remove();
  const table = $("body > div .table_container > table > tbody > tr").each((index, element) => {
    const tds = $(element).find("td");
    const id = $(tds).find("a").attr('href');
    const name = $(tds[0]).text();
    const position = $(tds[1]).text();
    const age = $(tds[2]).text();
    const team = $(tds[3]).text();  
    const games = $(tds[4]).text();  
    const started = $(tds[5]).text();          
    const mp = $(tds[6]).text();
    const fg = $(tds[7]).text();
    const fga = $(tds[8]).text();
    const fgp = $(tds[9]).text();
    const three_made = $(tds[10]).text();
    const three_attempts = $(tds[11]).text();
    const three_percent = $(tds[12]).text();
    const ft = $(tds[17]).text();
    const fta = $(tds[18]).text();
    const ftp = $(tds[19]).text();
    const orb = $(tds[20]).text();
    const drb = $(tds[21]).text();
    const trb = $(tds[22]).text();
    const ass = $(tds[23]).text();
    const stl = $(tds[24]).text();
    const blk = $(tds[25]).text();
    const tov = $(tds[26]).text();
    const pf = $(tds[27]).text();
    const points = $(tds[28]).text();

    const tableRow = { id, name, position, age, team ,games, started, mp, fg, fga, fgp, three_made, three_attempts, three_percent, ft, fta, ftp, orb, drb, trb, ass, stl, blk, tov, pf, points};
    scrapedData.push(tableRow);
});
  console.log(scrapedData);
  //console.log(table.html()); 
  res.status(200).send({Data:scrapedData});
});

module.exports = router;
