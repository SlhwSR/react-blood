import { getMaterialInfo } from "@/service/modules/productionPlan"
export const dealInfo = (material, pic, id, every, processName, processInfo) => {
    let process = []
    //console.log(material);
    const nodeids = pic.nodes.map((item, index) => item.id).splice(1);
    nodeids.length = nodeids.length - 1;
    console.log('ccccccc 1d5151515');
    console.log(processInfo);
    for (let i = 0; i < nodeids.length; i++) {
        process.push({
            materials: every[i],
            processName: processName[i+1],
            processId: processInfo[i]?.processId,
            nodeId: nodeids[i],
            processCode: processInfo[i]?.processCode,
        })
    }
    return process
}