
function openDialog() {
    const dialogRef = document.getElementById("dialog");
    dialogRef.showModal();
}

function closeDialog() {
    const dialogRef = document.getElementById("dialog");
    dialogRef.close();
}

function preventCloseDialogOnDialog(event) {
    event.stopPropagation();
}