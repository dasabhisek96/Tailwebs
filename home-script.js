document.addEventListener("DOMContentLoaded", function () {
    const studentList = document.getElementById("student-list");

    // Function to open modal for adding a new student
    function openAddModal() {
        // Reset form fields and modal state
        document.getElementById("student-name").value = "";
        document.getElementById("student-subject").value = "";
        document.getElementById("student-marks").value = "";

        document.getElementById("modal-title").textContent = "Add New Student";
        document.getElementById("add-btn").style.display = "inline-block";
        document.getElementById("edit-btn").style.display = "none";

        document.getElementById("student-modal").style.display = "block";
    }

    // Function to open modal with student details for editing
    function openEditModal(row) {
        const name = row.cells[0].querySelector(".name-cell").textContent.trim().replace('S ', ''); 
        const subject = row.cells[1].textContent.trim();
        const marks = row.cells[2].textContent.trim();

        document.getElementById("student-name").value = name;
        document.getElementById("student-subject").value = subject;
        document.getElementById("student-marks").value = marks;

        // Update modal title and buttons for editing
        document.getElementById("modal-title").textContent = "Edit Student";
        document.getElementById("add-btn").style.display = "none";
        document.getElementById("edit-btn").style.display = "inline-block";

        document.getElementById("student-modal").style.display = "block";

        // Handle form submission for editing
        document.getElementById("edit-btn").addEventListener("click", function (event) {
            event.preventDefault();

            // Update the existing row with new values
            row.cells[0].innerHTML = `<div class="name-cell"><span class="icon">S</span> ${document.getElementById("student-name").value}</div>`;
            row.cells[1].textContent = document.getElementById("student-subject").value;
            row.cells[2].textContent = document.getElementById("student-marks").value;

            // Close modal after editing
            document.getElementById("student-modal").style.display = "none";
        });
    }

    // Function to add a new student to the table
    function addStudent(name, subject, marks) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><div class="name-cell"><span class="icon">${name[0]}</span> ${name}</div></td>
            <td>${subject}</td>
            <td>${marks}</td>
            <td>
                <div class="dropdown-toggle">
                    <i class="fa fa-caret-down" aria-hidden="true"></i>
                </div>
                <div class="dropdown-content">
                    <a href="#" class="edit-btn">Edit</a>
                    <a href="#" class="delete-btn">Delete</a>
                </div>
            </td>
        `;
        studentList.appendChild(tr);

        // Add event listener for edit button
        const editButton = tr.querySelector(".edit-btn");
        editButton.addEventListener("click", function (e) {
            e.preventDefault();
            openEditModal(tr);
            closeDropdown(tr);
        });

        // Add event listener for delete button
        const deleteButton = tr.querySelector(".delete-btn");
        deleteButton.addEventListener("click", function (e) {
            e.preventDefault();
            tr.remove(); // Remove the row from the table
            closeDropdown(tr);
        });

        // Add event listener for dropdown toggle
        const dropdownToggle = tr.querySelector(".dropdown-toggle");
        dropdownToggle.addEventListener("click", function () {
            tr.querySelector(".dropdown-content").classList.toggle("show");
        });
    }

    // Function to close dropdown when edit or delete is clicked
    function closeDropdown(row) {
        row.querySelector(".dropdown-content").classList.remove("show");
    }

    // Fetch JSON data from students.json
    const token = localStorage.getItem('token');
    if (!token) {
        //alert('Please log in first');
        window.location.href = 'login.html';
        return;
    }

     fetch('http://localhost:3002/mark/student', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        
    })
        .then((response) => response.json())
        .then((data) => {
            data.forEach((student) => {
                addStudent(student.name, student.subject, student.marks);
            });
        })
        .catch((error) => {
            console.error("Error loading students:", error);
        });

    // Add event listener for adding new student button
    document.getElementById("add-student-btn").addEventListener("click", function () {
        openAddModal();
    });

    // Close modal when clicking on close button
    document.getElementsByClassName("close-btn")[0].addEventListener("click", function () {
        document.getElementById("student-modal").style.display = "none";
    });

    // Handle form submission for adding new student
    document.getElementById("student-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("student-name").value;
        const subject = document.getElementById("student-subject").value;
        const marks = document.getElementById("student-marks").value;

        // Add new student to the table
        addStudent(name, subject, marks);

        // Close modal after adding new student
        document.getElementById("student-modal").style.display = "none";
    });

    // Add event listener for Logout button
    document.getElementById("logout-btn").addEventListener("click", function (event) {
        event.preventDefault();
        // Redirect to login screen or perform logout operation
        window.location.href = "login.html"; // Replace with your actual login page URL
    });
});
