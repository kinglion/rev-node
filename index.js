var fs = require('fs');

var originDirectory = process.argv[2];
var styleSign = process.argv[3]?process.argv[3]:"";


//遍历文件，替换
var traversaltAndReplace = function(path){
	fs.stat(path, function (err, stats) {
		if (err) throw err;
		if(stats.isFile()){
			writeFileAndReplace(path);
		}
		if(stats.isDirectory()){
			console.info("处理目录:"+path);
			fs.readdir(path,function(err,files){
				for(var key in files){
					traversaltAndReplace(path+"/"+files[key]);
				}
			});
		}
	});
}

//读取文件并替换
var writeFileAndReplace = function(file){
	fs.readFile(file,'utf8', function (err, data) {
	  if (err) throw err;

	  var cssNameRegx = new RegExp("(\.css)(.*)\"","ig"),
	      jsNameRegx = new RegExp("(\.js)(.*)\"","ig"),
	      replaceText = '$1'+'?'+styleSign+new Date().getTime()+'"';

	  data = data.replace(/(\<link.*\.css)(.*)\"/ig,replaceText);
	  data = data.replace(/(\<script.*\.js)(.*)\"/ig,replaceText);

	  fs.writeFile(file,data,'utf8',function(errWrite){
	  		if(errWrite)throw errWrite;
	  		console.log("处理了文件:"+file);
	  });
	});
}

traversaltAndReplace(originDirectory);