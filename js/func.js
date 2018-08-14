function creatChart(string){
    chart.clear();

    var url = './json/'+string+'.json';
    //console.log(url);
    $.getJSON(url, function (chinaGeoJSON) {

        echarts.registerMap('china', chinaGeoJSON);

        var regions = chinaGeoJSON.features.map(function (feature) {
            var pr_name = feature.properties.name;
            //console.log(pr_name);
            var pr_num = 0;
            for(var i=0,lens = ytw_data.prlist.length;i<lens;i++){
                var temp = ytw_data.prlist[i].pr.substr(0,2);
                if(temp == pr_name.substr(0,2)){           
                    pr_num = ytw_data.prlist[i].num;
                    min=0;
                    max=30;
                }

            }
            for(var i=0,lens = ytw_data.citylist.length;i<lens;i++){
                var temp = ytw_data.citylist[i].city.substr(0,2);
                if(temp == pr_name.substr(0,2)){           
                    pr_num = ytw_data.citylist[i].num;
                    min=0;
                    max=7;
                }

            }
            return {
                name: pr_name,
                value: pr_num,//parseInt(Math.random()*(7)
                height: 3
            };
        });

        option=({
            tooltip: {},
            visualMap: {
                show: false,
                min: min,
                max: max,
                inRange: {
                    //color: ['#e0ffff', '#006edd']
                    //color: ['#FFFF24','#FF5702']
                    color: ['#68b2fd','#014fb2','#053e85']
                },
                calculable:true

            },
            series: [{
                name:'基于地理信息的站点展示',
                type: 'map3D',
                map: 'china',

                regionHeight: 3,

                    // 配置为全景贴图
                    // environment: 'bg.jpg',

                // shading: 'realistic',
                // silent: true,
                // instancing: true,
                // realisticMaterial: {
                //     metalness: 1,
                //     roughness: 0.2,
                // },
                // baseLayer: {
                //     'urlTemplate': 'bg.jpg',
                //     'subdomains': ['a', 'b', 'c', 'd']
                // },
                // altitudeScale: 2,
                // postEffect: {
                //     enable: true,
                //     FXAA: {
                //         enable: true
                //     }
                // },
                // light: {
                //     main: {
                //         intensity: 1,
                //         shadow: true,
                //         shadowQuality: 'high'
                //     },
                //     ambient: {
                //         intensity: 0.
                //     },
                //     ambientCubemap: {
                //         texture: 'light.hdr',
                //         exposure: 1,
                //         diffuseIntensity: 0.5
                //     }
                // },


               label: {
                    show:true,
                    formatter:function(params){
                        var content='',
                        content=params.name;
                        return content;
                    },
                    textStyle:{
                        color:'#EECBAD',
                        fontWeight : 'normal',
                        fontSize : 5,
                        backgroundColor: 'rgba(0,23,11,0)'
                    },
                    emphasis: {//对应的鼠标悬浮效果
                        show: true,
                        textStyle:{color:"#f00"}
                    } 
                },

                itemStyle: {

                    normal: {
                        opacity:0.7,
                        borderWidth: 0.2
                    }, //阴影效果
                    emphasis: {
                        color: 'rgb(255,255,255)'
                    }
                },

                

                viewControl: {
                    autoRotate: false,
                    distance: 150
                },


                data: regions
            }]
        });
        chart.setOption(option);

    });
}

function creatChartmap(string){

    var myChart = echarts.init(document.getElementById('list-map'));
    
    myChart.clear();


    var url = './json/'+string+'.json';

    //var str = string 
    //console.log(url);
    $.getJSON(url, function (chinaGeoJSON) {

        echarts.registerMap('temp_map', chinaGeoJSON);

        var regions = chinaGeoJSON.features.map(function (feature) {
            var pr_name = feature.properties.name;
            //console.log(pr_name);
            var pr_num = 0;
            for(var i=0,lens = ytw_data.prlist.length;i<lens;i++){
                var temp = ytw_data.prlist[i].pr.substr(0,2);
                if(temp == pr_name.substr(0,2)){           
                    pr_num = ytw_data.prlist[i].num;
                    min=0;
                    max=30;
                }

            }
            for(var i=0,lens = ytw_data.citylist.length;i<lens;i++){
                var temp = ytw_data.citylist[i].city.substr(0,2);
                if(temp == pr_name.substr(0,2)){           
                    pr_num = ytw_data.citylist[i].num;
                    min=0;
                    max=7;
                }

            }
            return {
                name: pr_name,
                value: pr_num,//parseInt(Math.random()*(7)
            };
        });

        option=({
            tooltip: {},
            visualMap: {
                show: false,
                min: min,
                max: max,
                inRange: {
                    //color: ['#e0ffff', '#006edd']
                    //color: ['#FFFF24','#FF5702']
                    color: ['#68b2fd','#014fb2','#053e85']
                },
                calculable:true

            },
            series: [{
                name:'基于地理信息的站点展示',
                type:'map',
                map: 'temp_map',

               label: {
                    show:true,
                    formatter:function(params){
                        var content='',
                        content=params.name;
                        return content;
                    },
                    textStyle:{
                        color:'#EECBAD',
                        fontWeight : 'normal',
                        fontSize : 5,
                        backgroundColor: 'rgba(0,23,11,0)'
                    },
                    emphasis: {//对应的鼠标悬浮效果
                        show: true,
                        textStyle:{color:"#f00"}
                    } 
                },

                itemStyle: {

                    normal: {
                        opacity:0.7,
                        borderWidth: 0.2
                    }, //阴影效果
                    emphasis: {
                        color: 'rgb(255,255,255)'
                    }
                },

                data: regions
            }]
        });
        myChart.setOption(option);

    });
    
}

function next_func(){
    next_button.setAttribute("style","display:none;");
    pre_button.setAttribute("style","display:inline;");
    var str = "province/"+next_pr;
    
    creatChartmap(str);

    creatChart(str);

    var temp_list = Array();
    for(var i=0,lens = ytw_data.citylist.length;i<lens;i++){
        if(ytw_data.citylist[i].pr == next_pr1){
            temp_list.push(ytw_data.citylist[i]);
        }
    }
    //console.log(temp_list);

    creatChart1(temp_list,"type2");

    createTable(temp_list,2);



}

function pre_func(){
    pre_button.setAttribute("style","display:none;");
    next_button.setAttribute("style","display:none;");
    
    creatChartmap("china");

    creatChart("china");

    creatChart1(ytw_temp.prlist,"type1");

    createTable(ytw_data.prlist,1);
}

function createTable(data,type){

    var tableData ="";
    var total = 1;
    var compare = function (obj1, obj2) {
        var val1 = obj1.num;
        var val2 = obj2.num;
        if (val1 > val2) {
            return -1;
        } else if (val1 < val2) {
            return 1;
        } else {
            return 0;
        }            
    };

    data.sort(compare);

    for(var i=0;i<data.length;i++){
        total += data[i].num;
    }
    
    for(var i=0;i<data.length;i++){
        tableData+="<tr class=\"tr"+i+"\">";
        tableData+="<td class=\"index\"><span>"+(i+1)+"</span></td>";
        if(type == 1){
            tableData+="<td class=\"province\">"+data[i].pr+"</td>";
        }else if(type==2){
            tableData+="<td class=\"province\">"+data[i].city+"</td>";
        }
        
        tableData+="<td class=\"station-num\">"+data[i].num+"</td>";
        var temp = (data[i].num/total)*100;
        tableData+="<td class=\"proportion\"><span class=\"txt\" style=\"bottom: 14.2px;\">"+temp.toFixed(2)+"%</span>";
        tableData+="<span class=\"box\" style=\"height: "+temp+"%;\"></span></td>"
        tableData+="</tr>";
    }

    
    $("#tbody1").html(tableData);
}

function creatChart1(list,type,type1){
    //
    var myChart = echarts.init(document.getElementById('chart'));
    var myChart1 = echarts.init(document.getElementById('chart1'));
    var myChart2 = echarts.init(document.getElementById('chart2'));
    var myChartb = echarts.init(document.getElementById('chart3'));
    myChart.clear();
    myChart1.clear();
    myChart2.clear();
    var name = "";
    var dataAxis = Array();
    var data = Array();
    var seriesData = Array();
    var yMax = 0;

    for(var i=0;i<list.length;i++){
        if(type == "type2"){
            name = list[i].city;
        }else if(type == "type1"){
            name = list[i].pr;
        }
        if(list[i].num>yMax){
            yMax = list[i].num;
        }
        dataAxis.push(name);
        data.push(list[i].num);
        if(i<10||type=="type2"){
            seriesData.push({
                name: name,
                value: list[i].num
            });
        }
        
    }

    yMax = (Math.floor(yMax/10)+1)*10;
    //console.log(yMax);

    
    var dataShadow = [];

    for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
    }

    option = {

        xAxis: {
            data: dataAxis,
            axisLabel: {
                interval: 5,
                rotate: -60,
                textStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#fff'
                }
            }
        },
        tooltip: {},
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            { // For shadow
                type: 'bar',
                itemStyle: {
                    normal: {color: 'rgba(0,0,0,0.05)'}
                },
                barGap:'-100%',
                barCategoryGap:'40%',
                data: dataShadow,
                animation: false
            },
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#83bff6'},
                                {offset: 0.5, color: '#188df0'},
                                {offset: 1, color: '#188df0'}
                            ]
                        )
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#2378f7'},
                                {offset: 0.7, color: '#2378f7'},
                                {offset: 1, color: '#83bff6'}
                            ]
                        )
                    }
                },
                data: data
            }
        ]
    };

    option1 = {
        xAxis: {
            data: dataAxis,
            axisLabel: {
                interval: 5,
                rotate: -60,
                textStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#fff'
                }
            }
        },
        tooltip: {},
        series: [{
            data: data,
            type: 'line',
            animationEasing: 'bounceInOut',
            animationDuration: 100
        }]
    };
    option2 = {
        // polar: {},
        // angleAxis: {
        //     axisLabel: {
        //         interval: 5,
        //         rotate: -60,
        //         textStyle: {
        //             color: '#fff'
        //         }
        //     },
        // },
        tooltip : {
            trigger: 'item',
            formatter: "{b} <br/>站点数 : {c} ({d}%)"
        },
        series : [
            {
                name: '',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                data: seriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    //interval: 60,
                    show:true
                }
            }
        ]
    };
    //console.log(option2);
    myChart.setOption(option);
    myChart1.setOption(option1);
    myChart2.setOption(option2);
    // if(type=="type1"){
    //     myChart.setOption(option);
    //     myChart1.setOption(option1);
    //     myChart2.setOption(option2);
        
    // }else if(type=="type2"){
         
    //      if(type1==1){
    //         myChartb.setOption(option1);
    //      }else if(type1==2){
    //         myChartb.setOption(option2);
    //      }else{
    //         myChartb.setOption(option);
    //      }
    // }
    
    //myChartb.setOption(option);
    // Enable data zoom when user click bar.
    var zoomSize = 6;
    myChart.on('click', function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        myChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
    });
}