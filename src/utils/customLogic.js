export const dealNode = ({ global, nodes }, view, strange) => {
    let Y = 100
    let rect = {
        nodes: [],
        edges: [],
    }
    console.log(view);
    console.log(nodes);
    const init = {
        nodes: [     //代表节点列表
            {
                id: "3",   // 当前节点id
                type: "circle",  //节点形状 如: rect、circle、 ellipse、polygon、diamond	
                x: 200,   //当前节点横坐标
                y: 200,  //当前节点纵坐标
                properties: { //用来存贮改节点下的信息、比如时间戳、各种变量。
                    title: "普通话术",
                    content: "喂，您好，这里是XX装饰，专业的装修品牌。请问您最近有装修吗？",
                    answers: [
                        { id: "1", text: "装好了" },
                        { id: "2", text: "肯定" },
                        { id: "3", text: "拒绝" },
                        { id: "4", text: "否定" },
                        { id: "5", text: "默认" }
                    ]
                }
            },
            {
                id: "4",
                type: "rect",
                x: 400,
                y: 300,
            },
            {
                id: "5",
                type: "ellipse",
                x: 500,
                y: 300,
            },
        ],
        edges: [  //连结节点边信息
            {
                sourceNodeId: "3", //起始节点id
                targetNodeId: "4",  //目标节点id 
                type: "bezier",   //连线类型  比如直线line、直角直线polyline
                properties: {   //每条边存贮对应信息的参数

                }
            },
            {
                sourceNodeId: "4",
                targetNodeId: "5",
                type: "bezier",
            }
        ]
    }
    const shape= view.cells
    shape.sort((a,b)=>b.shape!=='manhattanEdge' ? 1 : -1)
    //console.log(shape);
    const mapList=shape.reduce((prev,curr)=>{
        prev[curr.id]=curr
        return prev
    }) 
   // console.log(mapList);
    const start = nodes.startMessageEvent.map((item, index) => ({ id: item.id, type: "circle", x: 200, y: Y, properties: { name: item?.nodeName }, text: item?.nodeName }))
    rect.nodes[0] = start[0]
    const other = nodes.callActivity.map((item, index) => ({ id: item.id, type: "box", x: 200, y: Y, properties: { name: item?.nodeName }, text: item?.nodeName }))
    for (let i = 0; i < other.length; i++) {
        other[i].y = (i + 2) * 110
        rect.nodes.push(other[i])
    }
    const end = nodes.endNoneEvent.map((item, index) => ({ id: item.id, type: "rect", x: 200, y: (rect.nodes.length + 1) * 120, properties: { name: item?.nodeName }, text: item?.nodeName }))
    rect.nodes.push(end[0])
    const processData = shape.slice(0, rect.nodes.length).splice(1)
    const processEdge = shape.slice(rect.nodes.length, shape.length)
    const endEdge = processEdge.map((item, index) => ({ sourceNodeId: item.source?.cell, targetNodeId: item.target?.cell, type: "polyline" }))
    rect.edges = endEdge
    processData.length = processData.length - 1
    for (let q = 0; q < processData.length; q++) {
        rect.nodes[q + 1].properties.processId = processData[q]?.data?.node?.id
        // rect.node[q + 1].properties.logicId = processData[q]?.id
    }
    return rect
} 