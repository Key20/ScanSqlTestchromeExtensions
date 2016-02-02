main();

function main(){
	
	var urlLegalExpr="http(s)?:\/\/"+document.domain+"([\\/\\w\\W]+\\?)+";
	var objExpr=new RegExp(urlLegalExpr,"gi");
	urlArray=document.getElementsByTagName('a');

	for(i=0;i<urlArray.length;i++){
	    if(objExpr.test(urlArray[i].href)){
		    sqlScanTest(urlArray[i].href);
	    }
	}

}

function sqlScanTest(url,payload){


	sqlmapIpPort="http://127.0.0.1:8775";
    var payload=arguments[1] ||'{"url": "'+url+'","User-Agent":"wooyun"}';
	
    Connection('GET',sqlmapIpPort+'/task/new','',function(callback){

			var response=JSON.parse(callback);		

			if(response.success){
				Connection('POST',sqlmapIpPort+'/scan/'+response.taskid+'/start',payload,function(callback){
						var responseTemp=JSON.parse(callback);
						if(!responseTemp.success){
							alert('url send to sqlmapapi error');
						}
					}
				)
			}
			else{
				alert('sqlmapapi create task error');
			}
		}
	)
}


function Connection(Sendtype,url,content,callback){ 
    if (window.XMLHttpRequest){ 
        var xmlhttp=new XMLHttpRequest(); 
    } 
    else{ 
        var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); 
    } 
    xmlhttp.onreadystatechange=function(){ 
        if(xmlhttp.readyState==4&&xmlhttp.status==200) 
        { 
            callback(xmlhttp.responseText); 
        } 
    } 
    xmlhttp.open(Sendtype,url,true); 
    xmlhttp.setRequestHeader("Content-Type","application/json"); 
    xmlhttp.send(content); 
} 



function judgeUrl(url){
	var objExpr=new RegExp(/^http(s)?:\/\/127\.0\.0\.1/);
	return objExpr.test(url);
}

var payload={};

chrome.webRequest.onBeforeRequest.addListener(
    function(details){ 

    	if(details.method=="POST" && !judgeUrl(details.url)){
    		var saveParamTemp="";
    		for(var i in details.requestBody.formData){
    			
    			saveParamTemp+="&"+i+"="+details.requestBody.formData[i][0];
    		}
    		saveParamTemp=saveParamTemp.replace(/^&/,'');
    		//console.log(saveParamTemp);
    		payload["url"]=details.url;
    		payload["data"]=saveParamTemp;
    	}
    	//console.log(details);
    },
    {urls: ["<all_urls>"]},
    ["requestBody"]);


chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
    	if(details.method=="POST" && !judgeUrl(details.url)){
    		//var cookieTemp="",uaTemp="",refererTemp="";

    		for(var ecx=0;ecx<details.requestHeaders.length;ecx++){
    			

    			switch (details.requestHeaders[ecx].name){
    				case "Cookie":
    					payload["Cookie"]=details.requestHeaders[ecx].value;
    					break;
					case "User-Agent":
						payload["User-Agent"]=details.requestHeaders[ecx].value;
						break;
					case "Referer":
						payload["Referer"]=details.requestHeaders[ecx].value;
						break;
					default:
						break;
    			}

    		}
    		sqlScanTest("test",JSON.stringify(payload));
          	return {requestHeaders: details.requestHeaders};
    	}

    },
    {urls: ["<all_urls>"]},
    ["requestHeaders"]);