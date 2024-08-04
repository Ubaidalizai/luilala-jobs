import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';

const CVEditor = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    image: '',
    linkedin: '',
    website: '',
  });

  const [summary, setSummary] = useState('');
  const [workExperience, setWorkExperience] = useState([
    { company: '', position: '', duration: '', description: '' },
  ]);

  const [education, setEducation] = useState([
    { school: '', degree: '', graduation: '' },
  ]);

  const [projects, setProjects] = useState([
    { title: '', description: '' },
  ]);

  const [skills, setSkills] = useState(['']);
  const [languages, setLanguages] = useState(['']);
  const [certifications, setCertifications] = useState(['']);
  const [template, setTemplate] = useState('template1');

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  const handleSummaryChange = (value) => {
    setSummary(value);
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const updatedExperience = [...workExperience];
    updatedExperience[index][field] = value;
    setWorkExperience(updatedExperience);
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleSkillsChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const handleLanguagesChange = (index, value) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = value;
    setLanguages(updatedLanguages);
  };

  const handleCertificationsChange = (index, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = value;
    setCertifications(updatedCertifications);
  };

  const addWorkExperience = () => {
    setWorkExperience([...workExperience, { company: '', position: '', duration: '', description: '' }]);
  };

  const addEducation = () => {
    setEducation([...education, { school: '', degree: '', graduation: '' }]);
  };

  const addProject = () => {
    setProjects([...projects, { title: '', description: '' }]);
  };

  const addSkill = () => {
    setSkills([...skills, '']);
  };

  const addLanguage = () => {
    setLanguages([...languages, '']);
  };

  const addCertification = () => {
    setCertifications([...certifications, '']);
  };

  const downloadCV = () => {
    const element = document.getElementById('cv-content');
    html2pdf().from(element).save(`${personalInfo.name}-CV.pdf`);
  };

  return (
    <div className="bg-gray-100 py-10 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Create Your CV</h1>
        <div className="flex justify-end mb-4">
          <div className="w-full sm:w-auto">
            <label htmlFor="template" className="block text-gray-700 font-medium mb-2">
              Choose a template:
            </label>
            <select
              id="template"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
            >
              <option value="template1">Template 1</option>
              <option value="template2">Template 2</option>
              <option value="template3">Template 3</option>
            </select>
          </div>
        </div>
        <div id="cv-content" className={`cv-template ${template} bg-white shadow-md rounded-lg p-8`}>
          <div className="flex items-center mb-8">
            {personalInfo.image && (
              <img
                src={personalInfo.image}
                alt="Profile"
                className="w-24 h-24 rounded-full mr-6 object-cover"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{personalInfo.name}</h2>
              <div className="text-gray-600 mb-2">
                <p>{personalInfo.email}</p>
                <p>{personalInfo.phone}</p>
                <p>{personalInfo.address}</p>
                {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
                {personalInfo.website && <p>{personalInfo.website}</p>}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Summary</h2>
            <textarea
              value={summary}
              onChange={(e) => handleSummaryChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="A brief summary about yourself..."
            />
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Work Experience</h2>
            {workExperience.map((exp, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={exp.duration}
                  onChange={(e) => handleWorkExperienceChange(index, 'duration', e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                />
                <textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}
            <button
              onClick={addWorkExperience}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Add Work Experience
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  placeholder="School"
                  value={edu.school}
                  onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Graduation Year"
                  value={edu.graduation}
                  onChange={(e) => handleEducationChange(index, 'graduation', e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}
            <button
              onClick={addEducation}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Add Education
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                />
                <textarea
                  placeholder="Description"
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}
            <button
              onClick={addProject}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Add Project
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Skills</h2>
            <div className="flex flex-wrap">
              {skills.map((skill, index) => (
                <div key={index} className="bg-gray-200 rounded-md px-3 py-1 mr-2 mb-2 text-gray-600">
                  <input
                    type="text"
                    placeholder="Skill"
                    value={skill}
                    onChange={(e) => handleSkillsChange(index, e.target.value)}
                    className="bg-transparent focus:outline-none w-full"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={addSkill}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mt-4"
            >
              Add Skill
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Languages</h2>
            {languages.map((language, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  placeholder="Language"
                  value={language}
                  onChange={(e) => handleLanguagesChange(index, e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}
            <button
              onClick={addLanguage}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Add Language
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Certifications</h2>
            {certifications.map((cert, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  placeholder="Certification"
                  value={cert}
                  onChange={(e) => handleCertificationsChange(index, e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}
            <button
              onClick={addCertification}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Add Certification
            </button>
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handlePersonalInfoChange('image', URL.createObjectURL(e.target.files[0]))}
            className="bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mr-4"
          />
          <button
            onClick={downloadCV}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Download CV
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVEditor;
