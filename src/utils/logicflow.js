export const dealData = ({ global, nodes }, view, strange) => {
    let Y = 100
    let rect = {
        nodes: [],
        edges: [],
    }
    console.log("进来了");
    console.log(view);
    console.log(nodes);
    console.log("---------------------");
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
   // console.log(rect);
    return rect
} 