const xlsx = require('node-xlsx')
const fs = require('fs');

//readdir为读取该文件夹下的文件
fs.readdir('./input', function (err, files) {

    files.forEach((file) => {
        let path = `${__dirname}/input/${file}`;
        console.log(path);

        //表格解析
        let sheetList = xlsx.parse(path);
        console.log("=== sheetList ===", JSON.stringify(sheetList));
        let sheetData = [];

        // 获取需要 SHEET 的 DATA
        for(let i=0; i<sheetList.length; i++){
            if(sheetList[i].name == '数据汇总'){
                sheetData = sheetList[i].data || [];
                break;
            }
        }
        console.log("== sheetData ==", sheetData);

        //对数据进行处理
        let resultTemp = [], count, index;
        for(let i=0; i<sheetData.length; i++){
            if(i == 0){
                continue;
            }

            count = 0; index = 0;
            sheetData[i][0] = sheetData[i][0].trim();

            for(let j=0; j<resultTemp.length; j++){
                count++;
                if(resultTemp[j].name == sheetData[i][0]){
                    index = j;
                    count--;
                    break;
                }
            }

            if(count == resultTemp.length){
                resultTemp.push({
                    name: sheetData[i][0],
                    type: [sheetData[i][1]],
                    reason: [sheetData[i][2]]
                })
            }else{
                resultTemp[index].type.push(sheetData[i][1]);
                resultTemp[index].reason.push(sheetData[i][2]);
            }
        }

        console.log("== resultTemp ==", resultTemp)
        for(let k=0; k<resultTemp.length; k++){
            resultTemp[k].count = resultTemp[k].type.length;
            resultTemp[k].type = [...new Set(resultTemp[k].type)];
            resultTemp[k].reason = [...new Set(resultTemp[k].reason)];
        }
        console.log("== resultTemp ==", resultTemp)

        let result = [{
            "name": "计算结果",
            "data": [['供应商', '数量', '责任分类', '客诉原因']]
        }];

        for(let m=0; m<resultTemp.length; m++){
            result[0].data.push([resultTemp[m].name, resultTemp[m].count, resultTemp[m].type, resultTemp[m].reason])
        }

        //数据进行缓存
        let buffer = xlsx.build(result);

        //将缓存的数据写入到相应的Excel文件下
        fs.writeFile('./' + '输出结果.xlsx', buffer, function (err) {
            if (err) {
                console.log(err);
                return;
            }
        });
    })
})
