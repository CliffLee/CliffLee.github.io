/**
 * Some DOM grabs
 */

var aboutExpand 	= document.querySelector('.about-expand');
var aboutInfo		= document.querySelector('.about-container');
var timelineExpand 	= document.querySelector('.timeline-expand');
var timelineInfo	= document.querySelector('.timeline-container');
var timelineFilter 	= document.querySelector('.timeline-filter');
var skillsExpand 	= document.querySelector('.skills-expand');
var skillsInfo		= document.querySelector('.skills-container');
var skillsFilter	= document.querySelector('.skills-filter');
var inspoExpand		= document.querySelector('.inspo-expand');
var inspoInfo		= document.querySelector('.inspo-container');

aboutExpand.onclick = function() {
	aboutExpand.innerHTML = aboutExpand.innerHTML === '[+] ABOUT - Get to know me a little more'
		? '[-] ABOUT - Get to know me a little more'
		: '[+] ABOUT - Get to know me a little more';

	aboutInfo.classList.toggle('hidden');
}

timelineExpand.onclick = function() {
	if (timelineExpand.innerHTML === '[+] TIMELINE - A concise history of Clifford') {
		loadTimeline('all');
	} else {
		document.querySelector('.timeline-experience').innerHTML = '';
	}

	timelineExpand.innerHTML = timelineExpand.innerHTML === '[+] TIMELINE - A concise history of Clifford'
		? '[-] TIMELINE - A concise history of Clifford'
		: '[+] TIMELINE - A concise history of Clifford';

	timelineInfo.classList.toggle('hidden');
}

skillsExpand.onclick = function() {
	if (skillsExpand.innerHTML === '[+] SKILLS + BUZZWORDS - Disrupt! Infrastructure! NodeJS!') {
		loadSkills('all');
	} else {
		document.querySelector('.skills-experience').innerHTML = '';
	}

	skillsExpand.innerHTML = skillsExpand.innerHTML === '[+] SKILLS + BUZZWORDS - Disrupt! Infrastructure! NodeJS!'
		? '[-] SKILLS + BUZZWORDS - Disrupt! Infrastructure! NodeJS!'
		: '[+] SKILLS + BUZZWORDS - Disrupt! Infrastructure! NodeJS!';

	skillsInfo.classList.toggle('hidden');
}

inspoExpand.onclick = function() {
	if (inspoExpand.innerHTML === '[+] MOTIVATORS + INSPIRATORS - People, places, things, and ideas I find really cool') {
		loadInspo();
	} else {
		document.querySelector('.inspo-experience').innerHTML = '';
	}

	inspoExpand.innerHTML = inspoExpand.innerHTML === '[+] MOTIVATORS + INSPIRATORS - People, places, things, and ideas I find really cool'
		? '[-] MOTIVATORS + INSPIRATORS - People, places, things, and ideas I find really cool'
		: '[+] MOTIVATORS + INSPIRATORS - People, places, things, and ideas I find really cool';

	inspoInfo.classList.toggle('hidden');	
}

timelineFilter.onchange = function() {
	loadTimeline(timelineFilter.value);
}

skillsFilter.onchange = function() {
	loadSkills(skillsFilter.value);
}

// Build headers for fetch calls
function buildHeader() {
	var head = new Headers();
	head.append('pragma', 'no-cache');
	head.append('cache-control', 'no-cache');

	var init = {
		method: 'GET',
		headers: head
	};

	return init;
}

/**
 * Timeline Functions
 */

// Fetch data for timeline
function fetchTimeline() {
	return fetch('assets/data/timeline.json', buildHeader()).then(function(response) {
		return response.json();
	});
}

// Populate timeline events
function loadTimeline(type) {
	var timelineUl = document.querySelector('.timeline-experience');
	timelineUl.innerHTML = '';

	fetchTimeline().then(function(result) {	
		result.data.forEach(function(ev) {
			if (type === 'all') {
				timelineUl.innerHTML += '<li class="' + ev.type +
				'"><div class="left">' + ev.date + '</div><div class="desc"><div>' + ev.description.what + ' <em>' + ev.description.emphasis + '</em></div><div class="info">' + ev.description.info + '</div></div></li>';	
			} else {
				if (ev.type === type) {
					timelineUl.innerHTML += '<li class="' + ev.type +
					'"><div class="left">' + ev.date + '</div><div class="desc"><div>' + ev.description.what + ' <em>' + ev.description.emphasis + '</em></div><div class="info">' + ev.description.info + '</div></div></li>';
				}
			}
		});
	});
}


/**
 * Skills Functions
 */

// Fetch data for skills
function fetchSkills() {
	return fetch('assets/data/skills.json', buildHeader()).then(function(response) {
		return response.json();
	});
}

// Populate skills
function loadSkills(type) {
	var skillsUl = document.querySelector('.skills-experience');
	skillsUl.innerHTML = '';

	fetchSkills().then(function(result) {
		result.data.forEach(function(skill) {
			if (type === 'all') {
				skillsUl.innerHTML += '<li class="' + skill.type +
				'"><div class="left">' + skill.date + '</div><div class="desc"><div>' + skill.description.what + ' <em>' + skill.description.emphasis + '</em></div><div class="info">' + skill.description.info + '</div></div></li>';	
			} else {
				if (skill.type === type) {
					skillsUl.innerHTML += '<li class="' + skill.type +
					'"><div class="left">' + skill.date + '</div><div class="desc"><div>' + skill.description.what + ' <em>' + skill.description.emphasis + '</em></div><div class="info">' + skill.description.info + '</div></div></li>';	
				}
			}
		});
	});
}

/**
 * Inspiration Functions
 */
// Fetch data for inspiration
function fetchInspo() {
	return fetch('assets/data/inspiration.json', buildHeader()).then(function(response) {
		return response.json();
	});
}

// Populate inspo
function loadInspo() {
	var inspoUl = document.querySelector('.inspo-experience');
	inspoUl.innerHTML = '';

	fetchInspo().then(function(result) {
		result.data.forEach(function(insp) {
			console.log(insp);
			inspoUl.innerHTML += '<li class="' + insp.type + '"><div class="left">' + insp.description.name + '</div><div class="desc"><div>' + insp.description.blurb + '</div><div class="info">' + insp.description.info + '</div></div></li>';
		});
	})
}


















