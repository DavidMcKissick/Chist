//TODO: Figure out how to delete notes from the local array. 
//      Consider switching from array to individual local key-value pairs

let model = {
	version: '0.0.4',
	notes: ['Imma placeholder! Hooray!'],
	users: [],
	placeholders: ['Pick up milk...', 'Tell John Doe...', 'Make Jane a...', 'Read...', 'Turn in the...']
};
//Fear my overmodularized coooooooooooooooooode mwauhahahahaha
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
		noteText.textContent = content;
		controller.delGen(newDiv);
		newDiv.appendChild(noteText);
		master.appendChild(newDiv);
		newDiv.appendChild(hr);
	},
	saveNote: function(content){
		model.notes.push(content);
	},
	loadNotes: function(){
		if(model.notes.length <= 0){
			// console.log('done');
		} else {
			for(let i = 0; i < model.notes.length; i++){
				controller.generateNote(model.notes[i]);
			}
		}
	},
	localSave: function(){
		localStorage.setItem('notes', JSON.stringify(model.notes));
	},
	localLoad: function(){
		let notes = JSON.parse(localStorage.getItem('notes'));
		model.notes = notes;
	},
	localRemove: function(){
		localStorage.removeItem(0);
	},
	delGen: function(parent){
		let delButton = document.createElement('button');
		delButton.textContent = 'delete';
		delButton.class = 'deleteButton';
		delButton.addEventListener('click', function () {
			parent.remove();
		});
		parent.appendChild(delButton);
	}
};

let view = {
	inputListener: function(target){
		target.addEventListener('keydown', function (e){
			if(13 == e.keyCode){
				let note = target.value;
				controller.generateNote(note);
				controller.saveNote(note);
				controller.localSave();
				target.placeholder = controller.randomPlaceholder();
				target.value = '';
			}
		});
	}
};

controller.generateUI();