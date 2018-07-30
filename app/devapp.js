//TODO: Figure out organizing and rendering by date
var numeric;
let model = {
	version: '0.0.8',
	placeholders: ['Pick up milk...', 'Tell John Doe...', 'Make Jane a...', 'Read...', 'Turn in the...']
};
//Fear my overmodularized coooooooooooooooooode mwauhahahahaha
//The above comment was actually relevant at one point. This is vaguely spaghetty tbah.. But regardless, I'm proud of my work.
let controller = {  
	noteObj: {
		content: '',
		localIndex: 0
	},
	versionDat: function(){
		let version = model.version.toString();
		return version;
	},
	generateUI: function(){
		let core = document.getElementById('core');
		controller.headerGen(core);
		controller.TitleGen(document.getElementById('header'), 'Welcome to chist');
		controller.verTextGen(document.getElementById('header'));
		controller.formGen(core);
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
	},
	formGen: function(core){
		let div = document.createElement('div');
		div.id = 'noteDiv';
		let label = document.createElement('p');
		label.textContent = 'NEW NOTE';
		label.id = 'label';
		div.appendChild(label);
		let entrybox = document.createElement('input');
		entrybox.placeholder = this.randomPlaceholder() + '(enter)';
		view.inputListener(entrybox);
		div.appendChild(entrybox); 
		let hr = document.createElement('hr');
		hr.id = 'breakLine';
		div.appendChild(hr);
		core.appendChild(div);
		controller.localLoad();
		controller.loadNotes();
	},
	randomPlaceholder: function(){
		let num = Math.floor(Math.random() * 5);
		return model.placeholders[num];
	},
	generateNote: function(content){
		let master = document.getElementById('noteDiv');
		let newDiv = document.createElement('div');
		let hr = document.createElement('hr');
		newDiv.id = 'note';
		let noteText = document.createElement('p');
		noteText.textContent = localStorage.getItem(content);
		newDiv.appendChild(noteText);
		controller.delGen(newDiv, content);
		master.appendChild(newDiv);
		newDiv.appendChild(hr);
	},
	saveNote: function(content){
		localStorage.setItem((localStorage.length + 1) + content, content);
		numeric = (localStorage.length) + content;
		
	},
	loadNotes: function(){
		if(localStorage.length <= 0){
			return null;
		} else {
			for(let i = 0; i < localStorage.length; i++){
				controller.generateNote(localStorage.key(i));
			}
		}
	},
	localLoad: function(){
		let notes = JSON.parse(localStorage.getItem('notes'));
		model.notes = notes;
	},
	localRemove: function(){
		localStorage.removeItem(0);
	},
	delGen: function(parent, local){
		let delButton = document.createElement('button');
		delButton.textContent = 'delete';
		delButton.class = 'deleteButton';
		delButton.addEventListener('click', function () {
			parent.remove();
			localStorage.removeItem(local);
		});
		parent.appendChild(delButton);
	}
};

let view = {
	inputListener: function(target){
		target.addEventListener('keydown', function (e){
			if(13 == e.keyCode){
				let note = target.value;
				controller.saveNote(note);
				controller.generateNote(numeric); //Numeric will be returned by saveNote
				target.placeholder = controller.randomPlaceholder() + '(enter)';
				target.value = '';
			}
		});
	}
};

controller.generateUI();