const fetch = require("node-fetch");
const WebSocket = require('ws');
const fs = require('fs');
const child_process = require('child_process');
const cleanExit = function() { child_process.spawn('killall', ['teams']); process.exit() };
process.on('SIGINT', cleanExit); // catch ctrl-c
process.on('SIGTERM', cleanExit); // catch kill

child_process.spawnSync('killall', ['teams'])
teams =  child_process.spawn('/usr/share/teams/teams', ['--remote-debugging-port=7343'])
teams.on('close', (c) => { cleanExit() })
teams.on('exit', (c) => { cleanExit() })
teams.on('error', (c) => { cleanExit() })

var cloop = setInterval(() => { connect() }, 100);

async function connect() {
  try {
    console.log('waiting...')
    var response = await fetch('http://localhost:7343/json')
    var poss = await response.json()
    var mainwin = poss.filter(function(i){return (i.url.startsWith('https://teams.microsoft.com/_') && i.title.endsWith('| Microsoft Teams'));})
    if (mainwin.length !== 0) {
      clearInterval(cloop)
      inject(mainwin)
    }
  } catch (e) {}
}

function inject(mainwin) {
  console.log(mainwin)
  var unqid = Math.random().toString();
  var ws = new WebSocket(mainwin[0]['webSocketDebuggerUrl']);
  ws.on('open', () => {
    ws.send(JSON.stringify({
      'id': 1337,
      'method': 'Runtime.evaluate',
      'params': {'expression': fs.readFileSync('./inject.js', 'utf8').replace('[unqid]', unqid)}
    }));
    ws.send(JSON.stringify({
      'id': 1338,
      'method': 'Console.enable'
    }));
  });
  ws.on('message', (data) => {
    if (JSON.parse(data)?.method !== 'Console.messageAdded') console.log(JSON.parse(data));
    if (JSON.parse(data)?.result?.result?.subtype == 'error') {
      ws.close();
      setTimeout(() => { connect() }, 50)
    }
    if (JSON.parse(data)?.params?.message?.text === `reload-${unqid}`) {
      ws.close();
      setTimeout(() => {
        cloop = setInterval(() => { connect() }, 100);
      }, 1000);
    }
  });
}
