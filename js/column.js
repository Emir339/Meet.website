document.addEventListener('DOMContentLoaded', function () {
  
    let currentPage = 1;
    const itemsPerPage = 3;
    const totalItems = 6; 

    function displayColumns() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const cols = document.querySelectorAll(".cl1");

        for (let i = 0; i < cols.length; i++) {
            cols[i].style.display = i >= startIndex && i < endIndex ? "block" : "none";
        }
    }

    function previousPage() {
        if (currentPage > 1) {
            currentPage--;
            displayColumns();
        }
    }

    function nextPage() {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayColumns();
        }
    }

    document.getElementById("previousPage").addEventListener("click", function(event) {
        event.preventDefault();
        previousPage();
    });

    document.getElementById("nextPage").addEventListener("click", function(event) {
        event.preventDefault();
        nextPage();
    });

    displayColumns();

    const applyBtn = document.getElementById('applyBtn');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('closeBtn');
    const submitBtn = document.getElementById('submitBtn');
    const consentCheckbox = document.getElementById('consent');
    const consentMessage = document.getElementById('consentMessage');

    applyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        overlay.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
           
        }
    });

    consentCheckbox.addEventListener('change', () => {
        submitBtn.disabled = !consentCheckbox.checked;
        consentMessage.style.display = consentCheckbox.checked ? 'none' : 'block';
    });

    document.getElementById('applyForm').addEventListener('submit', (e) => {
        e.preventDefault();
        if (consentCheckbox.checked) {
            alert('Form sent!');
            overlay.style.display = 'none';
            document.getElementById('applyForm').reset();
            submitBtn.disabled = true;
        } else {
            consentMessage.style.display = 'block';
        }
    });

    const yearFilter = document.getElementById('yearFilter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');
    const closeModal = modal.querySelector('.close');

    function filterGalleryItems(year) {
        galleryItems.forEach(item => {
            item.style.display = item.getAttribute('data-year') === year ? 'block' : 'none';
        });
    }

    yearFilter.addEventListener('change', function () {
        filterGalleryItems(this.value);
    });

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            modal.style.display = 'block';
            const title = item.querySelector('.event-title').textContent;
            const date = '01.01.' + item.getAttribute('data-year');
            const description = 'Detailed description of the event...';
            const images = `
                <img src="event1_detail1.jpg" alt="Event detail 1">
                <img src="event1_detail2.jpg" alt="Event detail 2">
            `;

            modalContent.querySelector('.modal-title').textContent = title;
            modalContent.querySelector('.modal-date').textContent = 'Date: ' + date;
            modalContent.querySelector('.modal-description').textContent = description;
            modalContent.querySelector('.modal-images').innerHTML = images;
        });
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });


    filterGalleryItems(yearFilter.value);
});

document.addEventListener('DOMContentLoaded', function () {
    const contactsBtn = document.getElementById('contactsBtn');
    const contactsSection = document.getElementById('contactsSection');

    contactsBtn.addEventListener('click', function (e) {
        e.preventDefault(); 
        contactsSection.scrollIntoView({ behavior: 'smooth' }); 
    });
});

document.getElementById("show_program").addEventListener("click", function() {
    var pdfWindow = window.open("/pdf-program/Forum program.pdf", "_blank", "fullscreen=yes");
    if (pdfWindow) {
        pdfWindow.focus();
    } else {
        alert("The PDF file could not be opened. Please allow pop-ups.");
    }
});

document.getElementById("programBtn").addEventListener("click", function() {
    var pdfWindow = window.open("/pdf-program/Forum program.pdf", "_blank", "fullscreen=yes");
    if (pdfWindow) {
        pdfWindow.focus();
    } else {
        alert("The PDF file could not be opened. Please allow pop-ups.");
    }
});


let lastScrollTop = 0;

window.addEventListener("scroll", function() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    document.querySelector('.navbar').style.top = "-80px";
  } else {
    document.querySelector('.navbar').style.top = "0"; 
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
}, false);

// Фильтр галереи
const yearFilter = document.getElementById("yearFilter");
const galleryItems = document.querySelectorAll(".gallery-item");

yearFilter.addEventListener("change", function() {
    const selectedYear = this.value;
    galleryItems.forEach(item => {
        if (item.getAttribute("data-year") === selectedYear || selectedYear === "all") {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
});

// навигация галереи, показывает все фотки при нажатии, независимо от фильтра, не меняет год фильтра
let currentIndex = 0;
const itemsPerPage = 4;

function showItems(index) {
    galleryItems.forEach((item, i) => {
        if (i >= index && i < index + itemsPerPage) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

document.getElementById("prevBtn").addEventListener("click", function() {
    if (currentIndex > 0) {
        currentIndex -= itemsPerPage;
        showItems(currentIndex);
    }
});

document.getElementById("nextBtn").addEventListener("click", function() {
    if (currentIndex + itemsPerPage < galleryItems.length) {
        currentIndex += itemsPerPage;
        showItems(currentIndex);
    }
});

showItems(currentIndex);

document.querySelector('.overlay').addEventListener('click', function(event) {
    event.stopPropagation();
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);

    // AJAX 
// можете заменить 'your-server-endpoint' на реальный URL вашего сервера, который будет обрабатывать данные формы
    fetch('your-server-endpoint', { //<<
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Form submitted successfully!');

        document.querySelector('.overlay').style.display = 'none';
        document.querySelector('.form-container').style.display = 'none';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Form submission failed.');
    });
});
