let currentlyShown = document.getElementById("workflow-engine-content");

function showCorrectText(id) {
    let contentId = id.slice(0, id.length-4) + "content";
    let content = document.getElementById(contentId);
    currentlyShown.style.display = "none";
    content.style.display = "block";
    currentlyShown = content;
}

function bindLtoNodeEvents() {
  let nodes = document.getElementsByClassName("lto-node");

  if (!nodes.length) return;

  for (let _node in nodes) {
    const node = nodes[_node];

    if (!node.id) continue;

    node.addEventListener('click', function () {
      showCorrectText(node.id);
    })
  };
}
