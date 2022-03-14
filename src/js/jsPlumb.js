jsPlumb.ready(function () {
  const container = document.querySelector("#diagramContainer")
  const bodyText = document.querySelector(".js-bodyText")
  // jsPlumb.setContainer(container);
    let data = []
    let common = {
    isSource: true,
    isTarget: true,
    // 端点的形状
    endpoint: ['Dot', {
    radius: 7,
    fill: 'pink'
      }],
    endpointStyle:{ fill:"rgba(33,133,12,.3)"},
    // 连接线的颜色，大小样式
    connector: ["Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 3, alwaysRespectStubs: true }],
    connectorStyle: {
      lineWidth: 2,
      strokeWidth: 2,
      stroke: "#61B7CF",
      joinstyle: "round",
      outlineStroke: "white",
      outlineWidth: 1,
    },
    // 鼠标悬浮在连接线上的样式
    connectorHoverStyle: {
      lineWidth: 2,
      strokeStyle: 'red',
      outlineWidth: 2,
      strokeWidth: 2,
    },
    
    maxConnections: -1, 
    hoverPaintStyle: { fill: 'pink' },
    connectorOverlays: [
    ['Arrow', {
      width: 10,
      length: 8,
      location: 1
    }]
  ]
    }; 
   
    
//MAKE ITEM
  jsPlumb.addEndpoint(
    $(".item-header"),{
            anchor: ["Bottom"],
        },
    common
    );
    
  //DELETE CONNECTION
  jsPlumb.bind("click", function (conn, originalEvent) {
        if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
          jsPlumb.deleteConnection(conn);
        });
  //DELETE ITEM
  jsPlumb.on(document, "click", ".kill", function () {
    const selected = $(this).parents(".item").attr("id")
    if (confirm("Delete item?")) {
      jsPlumb.remove($(this).parents(".item"));
      data = data.filter(function (item) {
        return item.nodeId !== selected
      })
    }
    console.log("data",data);
  });
   //EDIT ITEM
  jsPlumb.on(document,"click", ".edit", function(){
    let exist = $(this).parents('.card-header').siblings('.card-body').children('.description').html()
    let existTitle = $(this).parent().siblings('.js-title').html()
    if (!exist){
      exist = ''
    }
    $('.js-bodyText').val(exist)
    $('.js-titleText').val(existTitle)
    bodyText.dataset.node = $(this).parents(".item")[0].id

  });
  
  jsPlumb.on(document, "click", ".add", function () {
    const item = `<div class="item-child item card">
                    <div class="card-header childHeader">
                        <h6 class="col-7 text-start js-title">Featured</h6>
                        <div class="col-5 text-end">
                            <i class="fas fa-trash-alt kill"></i>
                            <i class="fas fa-pen edit" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                            <i class="fas fa-plus add"></i>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="description"></div>
                    </div>
                </div>`;
    $('#diagramContainer').prepend(item);
    jsPlumb.addEndpoint(
      $(".item"),
        {
            // anchor: "Continuous"
            anchor:"AutoDefault"
        },
        common
    );
    jsPlumb.draggable($(".item"), {
      grid: [10,10],
      containment:'parent',
      drag: function (event){
        //  console.log(event.pos[0]); // for left position
        //  console.log(event.pos[1]); // for top position
      }
    });//sets the grid drag params     
  });
     
  const submit = document.querySelector("#submitContent")
  function submitContent() {
      submit.addEventListener("click", () => {
        let obj = {} 
        let titleWords = document.querySelector('.js-titleText').value
        let words = document.querySelector('.js-bodyText').value;
        let node = document.querySelector(".js-bodyText").getAttribute('data-node')
        document.getElementById(node).getElementsByClassName('description')[0].innerHTML = words
        document.getElementById(node).getElementsByClassName('js-title')[0].innerHTML = titleWords;
        //   $('#exampleModal').hide();
          obj.id = data.length+1
          obj.nodeId = node
          obj.title = titleWords
          obj.contents = words
        data.push(obj)
      });
  }
  submitContent()
});