function init(target){
  var socket = io.connect(location.host);

  buildPage();

  setTimeout(function(){
      socket.emit('pingARIA', {name: target, type: 'SUBJECT-OBJECT'});
  }, 100);

  socket.on('returnARIALedgerSpaceSummary', function(data){
      let summary = data.summary;
      if(data.status){
          console.log(summary);
      }

      document.getElementById('name-container').textContent = summary.name;
      document.getElementById('storage-capacity-amount').textContent = summary.content.capacity;
      document.getElementById('description-container').textContent = summary.content.description;

      let mods = [];//`<p>`;
      for(let i=0; i<summary.content.moderators.length; i++){
          //mods.push(curr);
          document.getElementById('moderators-list-container').appendChild(document.createElement('p'));
          document.getElementById('moderators-list-container').lastElementChild.textContent = summary.content.moderators[i].name;
          document.getElementById('moderators-list-container').lastElementChild.classList.add('moderator-name-container');
      }

      /*for(let j=0; j<document.getElementById('moderators-list-container').childNodes.length; j++){
          let mod = document.getElementById('moderators-list-container').textContent = mods[j]
      }*/

      document.getElementById('neighbors-list-container').textContent = summary.neighbors.ordinality;
      document.getElementById('cARds-list-container').textContent = summary.neighbors.cARds;
      document.getElementById('lyokoin-valuation-container').textContent = Math.round(summary.content.value.LYOKOIN*100)/100;
      document.getElementById('usd-valuation-container').textContent = summary.content.value.USD;
      document.getElementById('euro-valuation-container').textContent = summary.content.value.EUR;
  });
}

function buildPage(){
    document.body.innerHTML = `
    <div id='summary-container'>
        <div id='name-container'></div>
        <div id='storage-capacity-container'>
            <span id='storage-capacity-amount'></span>
            <span id='storage-capacity-label'>Gb</span>
        </div>
        <div id='meta-data-container'>
            <div id='description-container'></div>
            <div id='moderators-list-container'></div>
        </div>
        <div id='network-data-container'>
            <div id='neighbors-list-container' class='network-data-item-container'></div>
            <div id='cARds-list-container' class='network-data-item-container'></div>
        </div>
        <div id='value-container'>
            <div id='lyokoin-valuation-container' class='valuation-container'></div>
            <div id='usd-valuation-container' class='valuation-container'></div>
            <div id='euro-valuation-container' class='valuation-container'></div>
        </div>
    </div>
    `;
}
