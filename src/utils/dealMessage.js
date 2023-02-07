export const dealMessage = (val) => {
    let message
    switch (val[1]) {
        case "uk_code":
            message = `编号重复`;
            break;
        case "uk_name":
            message = `名称重复`;
            break;
        case "uk_simplify_name":
            message = `步骤简称重复`;
            break;
        case "uk_category":
            message = `产品类型重复`;
            break;
        case "uk_no":
            message='计划编号重复'
            break;
        case "uk_batch_no":
            message="产品批号重复"
            break;
    }
    return message
}