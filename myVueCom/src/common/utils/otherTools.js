export const deepCopy = function(data){ //深拷贝
    if(!data){
      return data;
    }
    let sourceCopy = data instanceof Array ? [] : {};
    for (let item in data) {
      sourceCopy[item] = typeof data[item] === 'object' ? deepCopy(data[item]) : data[item];
    }
    return sourceCopy;
}

export const buildMenu = function(array,ckey){
    let menuData = [];
    menuData = deepCopy(array);
    // array.forEach(function(e,i){
    //     menuData.push(e);
    // });
    // console.log(menuData,9);
    // let findChildren = function(parentArr){
    //     if(Array.isArray(parentArr) && parentArr.length){
    //         parentArr.forEach(function(parentNode){
    //             array.forEach(function(node){
    //                 if(node.children){
    //                     parentNode.children.push(node);
    //                 }
    //             })
    //             if(parentArr.children){
    //                 findChildren(parentNode.children);
    //             }
    //         })
    //     }
    // }
    // findChildren(menuData);
    return menuData;
}

export const setCurrentPath = function(vm , name ){

}
