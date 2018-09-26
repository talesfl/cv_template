function forEach(array, callback) {
	for(var i = 0; i < array.length; i++) {
		callback(array[i]);
	}
}

function buildHeaderSection() {
	var sectionHeader = document.querySelector("header>h1.section_header");
	sectionHeader.textContent = cv_data.header;
}

function buildEducationListFromData(node, query_selector, array){
	var li = null;
	var strong = null;
	var span = null;
	var br = null;
	var data = node.querySelector(query_selector);
	forEach(array, function(value){
		li = document.createElement("li");
		strong = document.createElement("strong");
		span = document.createElement("span");
		br = document.createElement("br");
		
		// institution
		li.appendChild(strong);
		strong.appendChild(span);
		span.textContent = value.institution;
		span.classList.toggle("institution");
		li.appendChild(br);
		
		//course_title
		span = document.createElement("span");
		span.textContent = value.course_title;
		span.classList.toggle("course_title");
		li.appendChild(span);
		
		if(value.course_title){
			// break line
			br = br.cloneNode();
			li.appendChild(br);
		}
		
		// period
		span = document.createElement("span");
		span.textContent = value.period;
		span.classList.toggle("period");
		li.appendChild(span);
	
		data.appendChild(li);
	});
}

function buildListFromData(node, query_selector, array){
	var li = null;
	var data = node.querySelector(query_selector);
	forEach(array, function(value){
		li = document.createElement("li");
		li.textContent = value;
		data.appendChild(li);
	});
}

function buildContactInfoListFromData(node, query_selector, array){
	var li = null;
	var span = null;
	var data = node.querySelector(query_selector);
	forEach(array, function(value){
		li = document.createElement("li");
		
		span = document.createElement("span");
		span.classList.toggle("contact_info_icon");
		span.innerHTML = value.icon;
		li.appendChild(span);
		
		span = document.createElement("span");
		span.classList.toggle("contact_info_value");
		span.innerHTML = value.value;
		li.appendChild(span);
		
		data.appendChild(li);
	});
}

function buildSection(id, section_info) {
	var sectionHeader = document.querySelector("#" + id + ">.section_header");
	sectionHeader.textContent = section_info.header;
	buildListFromData(document, "#" + id + ">.data", section_info.data);
}

function buildPersonalDataSection() {
	buildSection("personal_data", cv_data.personal_data);
}

function buildContactInfoSection() {
	var sectionHeader = document.querySelector("#contact_info>.section_header");
	sectionHeader.textContent = cv_data.contact_data.header;
	buildContactInfoListFromData(document, "#contact_info>.data", cv_data.contact_data.data);
}

function buildProResumeDataSection() {
	buildSection("pro_resume_data", cv_data.pro_resume_data);
}

function buildGoalDataSection() {
	buildSection("goal", cv_data.goal);
}

function buildCertificationSection() {
	buildSection("certification", cv_data.certifications);
}

function buildEducationSection() {
	var sectionHeader = document.querySelector("#education>.section_header");
	sectionHeader.textContent = cv_data.education.header;
	buildEducationListFromData(document, "#education>.data", cv_data.education.data);
}

function buildComplementaryFormation() {
	
	var sectionHeader = document.querySelector("#complementary_formation>.section_header");
	sectionHeader.textContent = cv_data.complementaty_education.header;
	
	var sectionSubheader = document.querySelector("#complementary_formation>.section_sub_header");
	sectionSubheader.textContent = cv_data.complementaty_education.subheader;
	
	buildListFromData(document, "#complementary_formation>.data", cv_data.complementaty_education.data);
}

function createJobDescription(job){
	
	var jobSection = document.querySelector("section#template>section.job").cloneNode(true);
	
	jobSection.querySelector("span.company").textContent = job.company;
	jobSection.querySelector("span.period").textContent = job.period;
	jobSection.querySelector("span.position").textContent = job.position;
	
	buildListFromData(jobSection, "ul.data", job.job_descriptions);
	
	return jobSection;
}

function getTemplateClone(){
	var templateSection = document.querySelector("#template").cloneNode();
	
	templateSection.removeAttribute("id");
	templateSection.removeAttribute("class");
	
	return templateSection;
}

function getJobHeaderClone(value){
	var jobHeader = document.querySelector("#template>h1.section_header").cloneNode();
	jobHeader.textContent = value;
	
	return jobHeader;
}

function buildJobExperienceSection() {

	var templateSection = getTemplateClone();
	var jobHeader = getJobHeaderClone(cv_data.job_experience.header);
	
	templateSection.appendChild(jobHeader);
	templateSection.appendChild(createJobDescription(cv_data.job_experience.data[0]));
	
	document.querySelector("#first_column").appendChild(templateSection);
	
	templateSection = getTemplateClone();
	jobHeader = getJobHeaderClone(cv_data.job_experience.header);
	templateSection.appendChild(jobHeader);
	
	var secondColumn = document.querySelector("#second_column");
	secondColumn.insertBefore(templateSection, document.querySelector("#skills"));
	
	forEach(cv_data.job_experience.data.slice(1, cv_data.job_experience.data.length), function(job) {
		templateSection.appendChild(createJobDescription(job));
	});
}

function buildSkillsSection(){
				
	var sectionHeader = document.querySelector("#skills>.section_header");
	sectionHeader.textContent = cv_data.skills.header;
	
	var data = document.querySelector("#skills>.data");
	var li = null;

	forEach(cv_data.skills.data, function(skill) {

		for(var key in skill) {
			if (skill.hasOwnProperty(key)) { 
				li = document.createElement("li");
				li.classList.toggle("skill_list");

				li.innerHTML ="<span class='skill'>" + key + ":</span><span class='prog_bar'><progress value='" + skill[key] + "' max='100'></span>";
				data.appendChild(li);
			}
		}

	});
}

// main
(function(){
	
	buildHeaderSection();
	buildPersonalDataSection();
	buildContactInfoSection();
	buildProResumeDataSection();
	buildGoalDataSection();
	buildCertificationSection() ;
	buildEducationSection() ;
	buildComplementaryFormation();
	buildJobExperienceSection();
	buildSkillsSection();
	
})();
	