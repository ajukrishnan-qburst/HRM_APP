
// ================================== IDCOUNT INTIAL VALUE ASSIGNMENT ======================================================
initIdCount();

function initIdCount() {
    if (!(localStorage.getItem("idCountJson"))) {
        let idCount = 6
        localStorage.setItem("idCountJson", JSON.stringify(idCount));
    }
}


// =============================== FETCHING DATA FROM employee_details.json FILE ===========================================
const getTableData = () => {
    fetch('json-files/employee_details.json')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("employeeData", JSON.stringify(data));
            sortEmployeeData()
        });
}

// =============================== FETCHING DATA FROM skills.json FILE ===================================================
const getSkillsData = () => {
    fetch('json-files/skills.json')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("skillsData", JSON.stringify(data));
            skillDataList()
        });
}


// ===================== CONDITION TO CHECK WHETHER THE LOCALSTORAGE IS EMPTY OR NOT =====================================
initData();

function initData() {
    if (!(localStorage.getItem("employeeData"))) {
        getTableData();
        getSkillsData();
    }
    else {
        listTables();
        sortEmployeeData()
    }

}


// =============================== CREATING OPTION TAG FROM THE SKILLS LIST FETCHED =======================================
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



// =============================== LISTING THE JSON DATA INTO TABLE =======================================================
function listTables() {
    const tableDataJson = JSON.parse(localStorage.getItem("employeeData"));
    const skillsDataJson = JSON.parse(localStorage.getItem("skillsData"));
    const parent = document.querySelector("#table-body-container");

    tableDataJson.forEach((rowData) => {
        let tableRow = document.createElement("tr");
        let skillRow = document.createElement("td");
        skillRow.setAttribute("class", "skillsBox");
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
            spanTag.setAttribute("class", "skillSpan");
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
        updateModalBox();
        deleteMsgBox();

    });
}


// =============================== ADD MODAL BOX AND CONFIRMATION BOX FUNCTIONALITY ======================================
function addModalBox() {
    const modal = document.querySelector("#add-modal")
    const addBtn = document.querySelector("#add-button")
    const closeBtn = modal.querySelector(".close-btn")
    const submitBtn = modal.querySelector(".btn")
    const successModal = document.querySelector("#success-box")
    const successCloseBtn = successModal.querySelector(".close-btn")
    addBtn.addEventListener("click", () => {
        modal.style.display = "block";
        idShow();
    });
    closeBtn.addEventListener("click", () => {
        tags = [];
        let input = document.querySelector("#skills-input");
        input.value = "";
        modal.style.display = "none";

    });
    submitBtn.addEventListener("click", () => {
        document.querySelector("#submit-add-btn").addEventListener('click', addEmployees);
    });

    successCloseBtn.addEventListener("click", () => {
        successModal.style.display = "none";
        tags = [];
        let idCount = JSON.parse(localStorage.getItem("idCountJson"));
        idCount += 1
        localStorage.setItem("idCountJson", JSON.stringify(idCount));
        window.location.reload();
    });

    window.addEventListener("click", (event) => {
        event.target == modal && (modal.style.display = "none");
    });

}

addModalBox()


// =============================== UPDATE MODAL BOX AND CONFIRMATION BOX FUNCTIONALITY ===================================
function updateModalBox() {
    const modal = document.querySelector("#update-modal")
    const updateBtn = document.querySelectorAll(".update-button")
    const closeBtn = modal.querySelector(".close-btn")
    const successModal = document.querySelector("#update-box")
    const successCloseBtn = successModal.querySelector(".close-btn")
    const inputUpdate = modal.querySelector(".tag-container input");

    let id;
    updateBtn.forEach(item => {
        item.addEventListener("click", () => {
            modal.style.display = "block";
            id = item.getAttribute("data-id")
            employeeDataDisplay(id);
            skillsView(id);

        });
    });
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        inputUpdate.value = "";

    });

    successCloseBtn.addEventListener("click", () => {
        window.location.reload();
        successModal.style.display = "none"
    });
    window.addEventListener("click", (event) => {
        event.target == modal && (modal.style.display = "none");
    });

}
updateModalBox();


// =============================== DELETE CONFIRMATION BOX FUNCTIONALITY ==================================================
function deleteMsgBox() {
    const modal = document.querySelector("#confirmation-box");
    const deleteBtn = document.querySelectorAll(".delete-button")
    const closeBtn = modal.querySelector(".close-btn");
    const noBtn = modal.querySelector("#no-btn");
    const yesBtn = modal.querySelector("#yes-btn");
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

deleteMsgBox();


// ====================================== SELFINCREMENT ID ==============================================================
function idShow() {
    idCount = JSON.parse(localStorage.getItem("idCountJson"));
    console.log(idCount)
    document.getElementById("id-input").value = idCount;

}


// ================================== SAVING VALUES OF THE ADDED EMPLOYE TO PUSH =========================================
function addEmployees(ev) {
    const skillsDataJson = JSON.parse(localStorage.getItem("skillsData"));
    const successModal = document.querySelector("#success-box")
    const modal = document.querySelector("#add-modal")
    const mailVal = document.getElementById("email-input").value;
    const nameVal = document.getElementById("name-input").value;
    let value = formValidation(mailVal, nameVal);

    if (value) {
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
        addForm.reset();
        modal.style.display = "none";
        successModal.style.display = "block";

    }

}


// ==================================== PUSH THE ADDED DATA TO TABLE ====================================================
function pushEmplyoee(rowData) {
    const tableDataJson = JSON.parse(localStorage.getItem("employeeData"));
    const skillsDataJson = JSON.parse(localStorage.getItem("skillsData"));
    tableDataJson.push(rowData);
    localStorage.setItem("employeeData", JSON.stringify(tableDataJson));

    let parent = document.querySelector("#table-body-container")

    let tableRow = document.createElement("tr");
    let skillRow = document.createElement("td");
    skillRow.setAttribute("class", "skillsBox")
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
        spanTag.setAttribute("class", "skillSpan");
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


// ======================== SKILLS MULTI SELECTION =====================================================================
const addForm = document.querySelector("#add-form")
const tagContainer = addForm.querySelector(".tag-container")
const input = addForm.querySelector(".tag-container input")

let tags = []


function create(label) {
    const div = document.createElement("div");
    div.setAttribute("class", "tag");
    const span = document.createElement("span");
    span.setAttribute("class", "tagSpan");
    span.setAttribute("data-id", label)
    span.innerHTML = label;
    const close = document.createElement("i");
    close.setAttribute("class", "close fa-solid fa-xmark ")
    close.setAttribute("data-item", label)
    div.appendChild(span);
    div.appendChild(close);
    return div;
}

function reset() {
    addForm.querySelectorAll(".tag").forEach(function (tag) {
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
            e.target.value = "";
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
        tags.splice(index, 1);
        addTags();
    }
});


// ================================ EMPLOYEEE ROW DELEETION ===============================================================
function deleteEmployee(id) {
    let deleteBtn = document.getElementById("yes-btn");
    deleteBtn.addEventListener("click", () => {
        let tableDataJson = JSON.parse(localStorage.getItem("employeeData"));
        tableDataJson.forEach(element => {
            if (id == element.employee_id) {
                const index = tableDataJson.indexOf(element)
                tableDataJson.splice(index, 1);
                localStorage.setItem("employeeData", JSON.stringify(tableDataJson));
                window.location.reload();
            }
        });
    })
}


// ========================== VIEW AND UPDATE EXISTING DATA OF AN EMPLOYEEE  ===========================================
function employeeDataDisplay(id) {
    let tableDataJson = JSON.parse(localStorage.getItem("employeeData"));
    tableDataJson.forEach(rowData => {
        if (id == rowData.employee_id) {
            document.getElementById("id-input-u").value = rowData.employee_id;
            document.getElementById("name-input-u").value = rowData.employee_name;
            document.getElementById("designation-input-u").value = rowData.designation;
            document.getElementById("experience-input-u").value = rowData.experience;
            document.getElementById("email-input-u").value = rowData.email;

        }

    });


}

// ================================== VALIDATING UPDATEFORM ======================================================
function storeUpdatedValue() {
    let id = document.getElementById("id-input-u").value;
    let tableDataJson = JSON.parse(localStorage.getItem("employeeData"));
    const modal = document.querySelector("#update-modal")
    const successModal = document.querySelector("#update-box")
    let mailVal = document.getElementById("email-input-u").value;
    let nameVal = document.getElementById("name-input-u").value;
    let value = formValidation(mailVal, nameVal);
    if (value) {
        tableDataJson.forEach(rowData => {
            if (id == rowData.employee_id) {
                let updatedSkills = updateSkills();
                rowData.employee_name = document.getElementById("name-input-u").value,
                    rowData.designation = document.getElementById("designation-input-u").value,
                    rowData.experience = document.getElementById("experience-input-u").value,
                    rowData.email = document.getElementById("email-input-u").value,
                    rowData.skills = updatedSkills;
            }
        });
        localStorage.setItem("employeeData", JSON.stringify(tableDataJson));
        modal.style.display = "none";
        successModal.style.display = "block"
    }
}

// ============================= VIEW AND UPDATING SKILLS FUNCTIONALITY==========================================
function skillsView(id) {
    let tableDataJson = JSON.parse(localStorage.getItem("employeeData"));
    const skillsDataJson = JSON.parse(localStorage.getItem("skillsData"));
    const updateForm = document.querySelector("#update-form");
    const tagContainerUpdate = updateForm.querySelector(".tag-container");
    const inputUpdate = updateForm.querySelector(".tag-container input");

    let tagsUpdate = []

    tableDataJson.forEach(rowData => {
        if (id == rowData.employee_id) {
            rowData.skills.forEach(skill => {
                skillsDataJson.forEach(item => {
                    if (skill === item.skill_id) {
                        tagsUpdate.push(item.skill_name);
                    }
                });

            });
        }
    });


    function addTags() {
        reset();
        tagsUpdate.forEach(item => {
            const divTag = create(item);
            tagContainerUpdate.prepend(divTag);

        });
        deleteTag()
    }
    addTags();

    function create(label) {
        const div = document.createElement("div");
        div.setAttribute("class", "tag");
        const span = document.createElement("span");
        span.setAttribute("class", "tagSpan");
        span.setAttribute("data-id", label)
        span.innerHTML = label;
        const close = document.createElement("i");
        close.setAttribute("class", "close fa-solid fa-xmark ");
        close.setAttribute("data-item", label);
        div.appendChild(span);
        div.appendChild(close);
        return div;
    }


    function reset() {
        updateForm.querySelectorAll(".tag").forEach(function (tag) {
            tag.parentElement.removeChild(tag);
        })
    }


    inputUpdate.addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
            if (tagsUpdate.includes(inputUpdate.value) || (inputUpdate.value).length < 1) {
                e.target.value = "";
                return;
            }
            const skillsDataJson = JSON.parse(localStorage.getItem("skillsData"));
            skillsDataJson.forEach(item => {
                if (inputUpdate.value === item.skill_name) {
                    tagsUpdate.push(inputUpdate.value);
                    addTags();
                    inputUpdate.value = "";
                }
            });
        }
    });

    function deleteTag() {
        let close = tagContainerUpdate.querySelectorAll(".tag i")
        close.forEach(item => {
            item.addEventListener("click", () => {
                const value = item.getAttribute("data-item");
                const index = tagsUpdate.indexOf(value);
                tagsUpdate.splice(index, 1);
                addTags();

            });
        });
    }

}

// ================== GETTING UPDATED SKILLS FROM MULTISELECT FUNCTIONALITY ==============================================
function updateSkills() {
    const updateForm = document.querySelector("#update-form")
    const skillsDataJson = JSON.parse(localStorage.getItem("skillsData"));
    let skillIdArr = [];
    let skillNameArr = [];
    updateForm.querySelectorAll(".tagSpan").forEach(item => {
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
    return (skillIdArr);

}


// ================================== SORTING THE TABLE BY ID AND NAME ============================================


function sortEmployeeData() {
    let sortData = document.getElementById("sort-dropdown")
    let selectValue = sortData.value;
    checkSelect();
    sortData.addEventListener("change", checkSelect);

    function checkSelect() {
        selectValue = sortData.value;
        selectValue == "1" ? sortById() : sortByName();
    }
}


function sortById() {

    let tableDataJson = JSON.parse(localStorage.getItem("employeeData"));
    tableDataJson = tableDataJson.sort((e1, e2) => {
        return (e1.employee_id - e2.employee_id);
    })
    localStorage.setItem("employeeData", JSON.stringify(tableDataJson));
    let element = document.getElementById("table-body-container");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    listTables();
}

function sortByName() {
    let tableDataJson = JSON.parse(localStorage.getItem("employeeData"));
    tableDataJson = tableDataJson.sort((e1, e2) => {
        return ((e1.employee_name.toLowerCase()).charCodeAt(0) - (e2.employee_name.toLowerCase()).charCodeAt(0));
    })
    localStorage.setItem("employeeData", JSON.stringify(tableDataJson));
    let element = document.getElementById("table-body-container");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    listTables();
}



// ============================================== FILTERING BY SKILLS =================================================================
function filterTable() {
    const searchInput = document.querySelector("#filter-select");
    searchInput.addEventListener("keyup", function (event) {
        const rows = document.querySelectorAll("#table-body-container tr");


        const skillSearch = event.target.value;
        rows.forEach(row => {
            let isThere = false;
            let spans = row.querySelectorAll(".skillSpan")
            spans.forEach(span => {
                console.log(span.textContent)
                span.textContent.toLocaleLowerCase().startsWith(skillSearch.toLowerCase()) && (isThere = true)

            })
            isThere ? row.style.display = "" : row.style.display = "none";
        });
    });
}
filterTable();


// ================================================= VALIDATING THE ADDFORM INPUTS =====================================
function formValidation(mailVal, nameVal) {

    let atSymbol = mailVal.indexOf("@");
    let dot = mailVal.indexOf(".");

    if ((nameVal.length < 1) || (nameVal.startsWith(" "))) {
        alert("Enter a valid name")
        return false;
    }
    else if (dot <= atSymbol + 2) {
        alert("Enter valid email id");
        return false;
    }
    else if (dot === mailVal.length - 1) {
        alert("Enter valid email id");
        return false;
    }
    else if (atSymbol < 1) {
        alert("Enter valid email id");
        return false;
    }
    else {
        return true;
    }
}

