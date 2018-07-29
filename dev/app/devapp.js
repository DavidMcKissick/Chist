let model = {
	version: '0.0.4',
	notes: [],
	users: []
};
//Fear my overmodularized coooooooooooooooooode mwauhahahahaha
let controller = {
	versionDat: function(){
		let version = model.version.toString();
		return version;
	},
	generateUI: function(){
		let core = document.getElementById('core');
		controller.headerGen(core);
		controller.TitleGen(document.getElementById('header'), 'Welcome to chist');
		controller.verTextGen(document.getElementById('header'));
	},
	headerGen: function(target){
		let header = document.createElement('header');
		header.id = 'header';
		target.appendChild(header);
	},
	TitleGen: function(target, content){
		let title = document.createElement('h1');
		title.id = 'title';
		title.textContent = content;
		target.appendChild(title);
	},
	verTextGen: function(target){
		let verText = document.createElement('h3');
		verText.textContent = 'v' + controller.versionDat();
		verText.id = 'verText';
		target.appendChild(verText);	
	}
};

// let view = {
// };

controller.generateUI();