

fetch('https://192.3.229.177:3011/rank')
    .then(res => res.json())
    .then(json => json.data.topList)
    .then(renderTopList)
function renderTopList(list) {
  document.querySelector('.rank-container').innerHTML = list.map(item =>
      `
      <li class="rank-item">
        <div class="topic-main">
        <a href="#" class="topic_media">
          <img data-src="${item.picUrl.replace(/http/,"https")}" class="lazyload">
          <span class="listen_count"><i class="icon"></i>${((item.listenCount)/10000).toFixed(1) + "万"}</span>
        </a>
        <div class="topic-info">
          <div class="topic-cont">
            <h3 class="topic-title">${item.topTitle}</h3>
            ${rankContain(item.songList)}
          </div>
          <i class="topic-arrow"></i>
        </div>
      </div>
    </li>
      `
  ).join('')
}

function rankContain(songList) {
  return songList.map((item, index) =>
      `
        <p>${index + 1}<span class="text-name">${item.songname}</span>- ${item.singername}</p>

      `
  ).join('')
}