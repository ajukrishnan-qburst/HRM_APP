// localStorage.clear();
const getTableData = () => {
    fetch('json-files/employee_details.json')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("employeeData", JSON.stringify(data));

        });
}
localStorage.getItem("employeeData") === null && getTableData();


const getSkillsData = () => {
    fetch('json-files/skills.json')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("skillsData", JSON.stringify(data));

        });
}
getSkillsData();

listTables();

function skillDataList() {
    const skillsDataJson = JSON.parse(localStorage.getItem("skillsData"));
    let skillList = document.querySelector("#skills-dropdown");
    skillsDataJson.forEach(skill => {
        let options = document.createElement("option");
        options.setAttribute("data-id", `${skill.skill_id}`)
        options.innerHTML = skill.skill_name;
        skillList.appendChild(options)
    })
}

skillDataList()


function listTables() {
    const tableDataJson = JSON.parse(localStorage.getItem("employeeData"));
    const skillsDataJson = JSON.parse(localStorage.getItem("skillsData"));
    let parent = document.querySelector("#data-table")

    tableDataJson.forEach((rowData) => {
        let tableRow = document.createElement("tr");
        let skillRow = document.createElement("td");
        let buttonRow = document.createElement("td");
        let updateBtn = document.createElement("i");
        let deleteBtn = document.createElement("i");

        tableRow.innerHTML = `<td>${rowData.employee_id}</td>
        <td>${rowData.employee_name}</td>
        <td>${rowData.designation}</td>
        <td>${rowData.email}</td>`;

        rowData.skills.forEach((skillData) => {
            let spanTag = document.createElement("span");
            let length = rowData.skills.length;
            if ((length - 1) == rowData.skills.indexOf(skillData)) {
                skillsDataJson.forEach((data) => {
                    skillData == data.skill_id && (spanTag.innerHTML = data.skill_name);
                });
            }
            else {
                skillsDataJson.forEach((data) => {
                    skillData == data.skill_id && (spanTag.innerHTML = `${data.skill_name},`);
                });
            }
            skillRow.appendChild(spanTag);
        });

        updateBtn.setAttribute("class", "update-button fa-solid fa-pen-to-square");
        updateBtn.setAttribute("data-id", `${rowData.employee_id}`);
        deleteBtn.setAttribute("class", "delete-button fa-solid fa-trash");
        deleteBtn.setAttribute("data-id", `${rowData.employee_id}`);

        tableRow.appendChild(skillRow);
        buttonRow.appendChild(updateBtn);
        buttonRow.appendChild(deleteBtn);
        tableRow.appendChild(buttonRow);
        parent.appendChild(tableRow);

    });
}



function addModalBox() {
    const modal = document.querySelector("#add-modal")
    const addBtn = document.querySelector("#add-button")
    const closeBtn = modal.querySelector(".close-btn")
    const submitBtn = modal.querySelector(".btn")
    const successModal = document.querySelector("#success-box")
    const successCloseBtn = successModal.querySelector(".close-btn")
    addBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none"
    });
    submitBtn.addEventListener("click", () => {
        modal.style.display = "none";
        successModal.style.display = "block"
    });

    successCloseBtn.addEventListener("click", () => {
        successModal.style.display = "none"
    });

    window.addEventListener("click", (event) => {
        event.target == modal && (modal.style.display = "none");
    });
    document.querySelector("#submit-add-btn").addEventListener('click', addEmployees);
}

addModalBox()

function updateModalBox() {
    const modal = document.querySelector("#update-modal")
    const updateBtn = document.querySelectorAll(".update-button")
    const closeBtn = modal.querySelector(".close-btn")
    const submitBtn = modal.querySelector(".btn")
    const successModal = document.querySelector("#update-box")
    const successCloseBtn = successModal.querySelector(".close-btn")
    updateBtn.forEach(item => {
        item.addEventListener("click", () => {
            modal.style.display = "block";
        });
    });
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
    submitBtn.addEventListener("click", () => {
        modal.style.display = "none";
        successModal.style.display = "block"

    });
    successCloseBtn.addEventListener("click", () => {
        successModal.style.display = "none"
    });
    window.addEventListener("click", (event) => {
        event.target == modal && (modal.style.display = "none");
    });
}
updateModalBox()

deleteMsgBox()

function deleteMsgBox() {
    const modal = document.querySelector("#confirmation-box")
    const deleteBtn = document.querySelectorAll(".delete-button")
    const closeBtn = modal.querySelector(".close-btn")
    const noBtn = modal.querySelector("#no-btn")
    const yesBtn = modal.querySelector("#yes-btn")
    deleteBtn.forEach(item => {
        item.addEventListener("click", () => {
            modal.style.display = "block";
            let id = item.getAttribute("data-id")
            deleteEmployee(id);
        });
    });
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none"
    });

    noBtn.addEventListener("click", () => {
        modal.style.display = "none"
    });
    yesBtn.addEventListener("click", () => {
        modal.style.display = "none"
    });

    window.addEventListener("click", (event) => {
        event.target == modal && (modal.style.display = "none");
    });
}







function addEmployees(ev) {
    const skillsDataJson = JSON.parse(localStorage.getItem("skillsData"));
    ev.preventDefault();
    let skillIdArr = [];
    let skillNameArr = [];
    document.querySelectorAll(".tagSpan").forEach(item => {
        let value = item.getAttribute('data-id')
        skillNameArr.push(value)
    })
    skillsDataJson.forEach(skill => {
        skillNameArr.forEach(skills => {
            if (skills === skill.skill_name) {
                skillIdArr.push(skill.skill_id)
            }
        })
        
    });
    let employee = {
        employee_id: document.getElementById("id-input").value,
        employee_name: document.getElementById("name-input").value,
        designation: document.getElementById("designation-input").value,
        experience: document.getElementById("experience-input").value,
        email: document.getElementById("email-input").value,
        skills: skillIdArr
    }
    pushEmplyoee(employee)
    document.getElementById("add-form").reset();
}

function pushEmplyoee(rowData) {
    const tableDataJson = JSON.parse(localStorage.getItem("employeeData"));
    const skillsDataJson = JSON.parse(localStorage.getItem("skillsData"));
    tableDataJson.push(rowData);
    localStorage.setItem("employeeData", JSON.stringify(tableDataJson));
    let parent = document.querySelector("#data-table")

    let tableRow = document.createElement("tr");
    let skillRow = document.createElement("td");
    let buttonRow = document.createElement("td");
    let updateBtn = document.createElement("i");
    let deleteBtn = document.createElement("i");

    tableRow.innerHTML = `<td>${rowData.employee_id}</td>
        <td>${rowData.employee_name}</td>
        <td>${rowData.designation}</td>
        <td>${rowData.email}</td>`;

    rowData.skills.forEach((skillData) => {
        let spanTag = document.createElement("span");
        let length = rowData.skills.length;
        if ((length - 1) == rowData.skills.indexOf(skillData)) {
            skillsDataJson.forEach((data) => {
                skillData == data.skill_id && (spanTag.innerHTML = data.skill_name);
            });
        }
        else {
            skillsDataJson.forEach((data) => {
                skillData == data.skill_id && (spanTag.innerHTML = `${data.skill_name},`);
            });
        }
        skillRow.appendChild(spanTag);
    });

    updateBtn.setAttribute("class", "update-button fa-solid fa-pen-to-square");
    updateBtn.setAttribute("data-id", `${rowData.employee_id}`);
    deleteBtn.setAttribute("class", "delete-button fa-solid fa-trash");
    deleteBtn.setAttribute("data-id", `${rowData.employee_id}`);

    tableRow.appendChild(skillRow);
    buttonRow.appendChild(updateBtn);
    buttonRow.appendChild(deleteBtn);
    tableRow.appendChild(buttonRow);
    parent.appendChild(tableRow);
    updateModalBox()
    deleteMsgBox()
}

// ============================================================================================================================

const tagContainer = document.querySelector(".tag-container")
const input = document.querySelector(".tag-container input")

let tags = []


function create(label) {
    const div = document.createElement("div");
    div.setAttribute("class", "tag");
    const span = document.createElement("span");
    span.setAttribute("class", "tagSpan");
    span.setAttribute("data-id",label)
    span.innerHTML = label;
    const close = document.createElement("i");
    close.setAttribute("class", "close fa-solid fa-xmark ")
    close.setAttribute("data-item", label)
    div.appendChild(span);
    div.appendChild(close);
    return div;
}

function reset() {
    document.querySelectorAll(".tag").forEach(function (tag) {
        tag.parentElement.removeChild(tag);
    })
}
function addTags() {
    reset();
    tags.slice().reverse().forEach(function (tag) {
        const input = create(tag);
        
        tagContainer.prepend(input);
    })

}

input.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
        if (tags.includes(input.value) || (input.value).length < 1) {
            e.target.value = ""
            return;
        }
        const skillsDataJson = JSON.parse(localStorage.getItem("skillsData"));
        skillsDataJson.forEach(item => {
            if (input.value === item.skill_name) {
                tags.push(input.value);
                addTags();
                input.value = "";
            }
        });       
    }
});


document.addEventListener("click", function (e) {
    if (e.target.tagName === "I") {
        const value = e.target.getAttribute("data-item");
        const index = tags.indexOf(value);
        tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
        addTags();
    }
});



function deleteEmployee(id) {
    let deleteBtn = document.getElementById("yes-btn");
    deleteBtn.addEventListener("click", () => {
        let tableDataJson = JSON.parse(localStorage.getItem("employeeData"));
        tableDataJson.forEach(element => {
            if (id == element.employee_id) {
                const index = tableDataJson.indexOf(element)
                tableDataJson = [...tableDataJson.slice(0, index), ...tableDataJson.slice(index + 1)];
                localStorage.setItem("employeeData", JSON.stringify(tableDataJson));
                window.location.reload();
            }
        });
    })
}
