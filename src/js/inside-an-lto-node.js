let currentlyShown = document.getElementById("workflow-engine-content");
function showCorrectText(id) {
    let contentId = id.slice(0, id.length-4) + "content";
    let content = document.getElementById(contentId);
    currentlyShown.style.display = "none";
    content.style.display = "block";
    currentlyShown = content;
}

let nodes = document.getElementsByClassName('lto-node')
Array.prototype.forEach.call(nodes, function(node) {
  node.addEventListener('click', function() {
    showCorrectText(node.id);
  })
})
