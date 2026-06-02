// Add Education Section
document.getElementById("addEducationBtn").addEventListener("click", function () {
    const container = document.getElementById("educationContainer");
    const newSection = document.createElement("div");
    newSection.classList.add("education-item");
    newSection.innerHTML = `
        <h3>Additional Education</h3>
        <input type="text" placeholder="Enter your university, college and school name">
        <input type="number" placeholder="Enter your CGPA">
        <input type="text" placeholder="Enter your session">
        <button class="remove-btn" onclick="removeEducation(this)">Remove</button>
    `;
    container.appendChild(newSection);
});

// Remove Education Section
function removeEducation(button) {
    button.parentElement.remove();
}

// Add Project Section
document.getElementById("addProjectBtn").addEventListener("click", function () {
    const container = document.getElementById("projectContainer");
    const newProject = document.createElement("div");
    newProject.classList.add("project-item");
    newProject.innerHTML = `
        <input type="text" placeholder="Enter your Project Name">
        <textarea placeholder="Project Description"></textarea>
        <button class="remove-btn" onclick="removeProject(this)">Remove</button>
    `;
    container.appendChild(newProject);
});

// Remove Project Section
function removeProject(button) {
    button.parentElement.remove();
}

// Add Achievement Section
document.getElementById("addAchievementBtn").addEventListener("click", function () {
    const container = document.getElementById("achievementContainer");
    const newAchievement = document.createElement("div");
    newAchievement.classList.add("achievement-item");
    newAchievement.innerHTML = `
        <input type="text" placeholder="Enter your Achievement">
        <button class="remove-btn" onclick="removeAchievement(this)">Remove</button>
    `;
    container.appendChild(newAchievement);
});

// Remove Achievement Section
function removeAchievement(button) {
    button.parentElement.remove();
}

// Generate Resume Preview
function generateResume() {
    // Basic Info
    document.getElementById("namePreview").textContent = document.getElementById("nameInput").value;
    document.getElementById("emailPreview").textContent = document.getElementById("emailInput").value;
    document.getElementById("summaryPreview").textContent = document.getElementById("summaryInput").value;

    // Education Preview
    let educationItems = document.querySelectorAll("#educationContainer .education-item");
    let eduHTML = "<h3>Education</h3><ul>";
    educationItems.forEach(item => {
        let fields = item.querySelectorAll("input");
        eduHTML += `<li>${fields[0].value} | CGPA: ${fields[1].value} | Session: ${fields[2].value}</li>`;
    });
    eduHTML += "</ul>";
    document.getElementById("educationPreview").innerHTML = eduHTML;

    // Project Preview
    let projectItems = document.querySelectorAll("#projectContainer .project-item");
    let projHTML = "<h3>Projects</h3><ul>";
    projectItems.forEach(item => {
        let name = item.querySelector("input").value;
        let desc = item.querySelector("textarea").value;
        projHTML += `<li><strong>${name}</strong>: ${desc}</li>`;
    });
    projHTML += "</ul>";
    document.getElementById("educationPreview").innerHTML += projHTML;

    // Achievement Preview
    let achievementItems = document.querySelectorAll("#achievementContainer .achievement-item");
    let achHTML = "<h3>Achievements</h3><ul>";
    achievementItems.forEach(item => {
        achHTML += `<li>${item.querySelector("input").value}</li>`;
    });
    achHTML += "</ul>";
    document.getElementById("educationPreview").innerHTML += achHTML;
}

// Download Resume
function downloadResume() {
    window.print();
}
