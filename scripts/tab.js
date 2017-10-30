let nav = document.querySelector('.nav-list')
nav.addEventListener('click', function (e) {
  let nodeList = nav.children
  let className1 = new RegExp("(\\s|^)" + "active" + "(\\s|$)")
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].className = nodeList[i].className.replace(className1, "")
    let divClass = "." + nodeList[i].getAttribute('data-view')
    document.querySelector(divClass).className += " "+ "hide"
  }
  e.target.className += " " + "active"
  let activeName = "." + e.target.getAttribute('data-view')
  let className2 = new RegExp("(\\s|^)" + "hide" + "(\\s|$)")

  log(document.querySelector(activeName))
  let actDiv = document.querySelector(activeName)
  actDiv.className=actDiv.className.replace(/hide/g,"")
})