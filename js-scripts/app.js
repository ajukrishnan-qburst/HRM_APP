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
}
updateModalBox()

function deleteMsgBox() {
    const modal = document.querySelector("#confirmation-box")
    const deleteBtn = document.querySelectorAll(".delete-button")
    const closeBtn = modal.querySelector(".close-btn")
    const noBtn = modal.querySelector("#no-btn")
    const yesBtn = modal.querySelector("#yes-btn")
    deleteBtn.forEach(item => {
        item.addEventListener("click", () => {
            modal.style.display = "block";
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

deleteMsgBox()



