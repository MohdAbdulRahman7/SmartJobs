// Pick text written in input field
document.querySelector(".button-container")
.addEventListener("click", () => {
    let text = document.getElementById("filter-jobs").value;
    getJobs().then(jobs => {
        let filteredJobs = filterJobs(jobs, text);
        showJobs(filteredJobs);
    })
})

//1. fetch from json file
function getJobs()
{
    //creating a promise
    return fetch("data.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data
    })
}

//3. show on webpage
function showJobs(jobs)
{
    console.log("Jobs in shoe", jobs);
    let jobsContainer = document.querySelector(".jobs-container");

    let jobsHTML = "";
    jobs.forEach(job => {
        
        jobsHTML += `
        <div class="job-tile">
        <div class="top">
            <img src="${job.logo}">
            <span class="material-icons more_horiz">more_horiz</span>
        </div>
        <div class="rolename">
            <span> ${job.roleName}</span>
        </div>
        <div class="location">
            <span> ${job.location}</span>
        </div>
        <div class="description">
             ${job.requirements.content}
        </div>
        <div class="buttons">
        <div class="button apply-now">
            Apply Now
        </div>
        <div class="button">
            Message
        </div>
        </div>
        </div>
        
        `
    })
    jobsContainer.innerHTML = jobsHTML;
}

function filterJobs(jobs, searchText)
{
    if(searchText){
        let filteredJobs = jobs.filter(job => {
            if(job.roleName.toLowerCase().includes(searchText) 
            || job.type.toLowerCase().includes(searchText)
            || job.company.toLowerCase().includes(searchText)
            || job.requirements.content.toLowerCase().includes(searchText)) {
                return true;
            } else {
                return false;
            }
        })
        return filteredJobs;
    } else {
        return jobs;
    }
}

//2. calling functions
getJobs().then(data => {
    showJobs(data);
});