/*=============== MOSTRAR MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navFechar = document.getElementById('nav-fechar')

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('mostrar-menu')
    })
}

if(navFechar){
    navFechar.addEventListener('click', () => {
        navMenu.classList.remove('mostrar-menu')
    })
}

/*=============== REMOVER MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')

    navMenu.classList.remove('mostrar-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== MUDAR FUNDO CABEÇALHO ===============*/
const blurHeader = () => {
    const header = document.getElementById('header');
    this.scrollY >= 50 ? header.classList.add('blur-header')
                       : header.classList.remove('blur-header')
}

window.addEventListener('scroll', blurHeader)

/*================== MOSTRAR SCROLL UP ==================*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('mostrar-scrollUp')
                        : scrollUp.classList.remove('mostrar-scrollUp');
}
window.addEventListener('scroll', scrollUp)

/*================== SEÇÕES FICAREM ATIVAS ==================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('link-ativo')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('link-ativo')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*================== SLIDER DEPOIMENTOS ==================*/
let swiperDepoimento = new Swiper(".depoimento__container", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 48,
        },
      },
  });

/*================== CALENDARIO JS ==================*/
const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
              "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        let isSunday = new Date(currYear, currMonth, i).getDay() === 0 ? "dia_st" : ""; // check if the day is Sunday
        let isSpecialDay = i === 23 && currMonth === 5 ? "dias_ocupados" : ""; // check if it's the special day (June 23)

        liTag += `<li class="${isToday} ${isSunday} ${isSpecialDay}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;

    // Adiciona um ouvinte de evento de clique a cada elemento <li> que representa um dia
    const dayElements = daysTag.querySelectorAll("li");
    dayElements.forEach((dayElement) => {
        dayElement.addEventListener("click", () => {
            const selectedDay = dayElement.innerText;
            const selectedMonth = currMonth + 1;
            const selectedYear = currYear;
            document.getElementById('dia').value = `${selectedDay}/${selectedMonth}/${selectedYear}`
        });
    });
}

renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

/*================== MODAL CALENDARIO ==================*/
const modalViews = document.querySelectorAll('.calendario__modal'),
      modalBtns = document.querySelectorAll('.calendario__botao'),
      modalCloses = document.querySelectorAll('.calendario__botao-fechar')

let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i);
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

/*================== ANIMAÇÕES ==================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 400,
    reset: false
})

sr.reveal(`.home__dados, .section__titulo, .servicos__card:nth-child(2), .footer`, {delay:400})
sr.reveal(`.sobre__dados, .servicos__card:nth-child(1), .agendamento__container`, {origin:'left'})
sr.reveal(`.sobre__imagem, .servicos__card:nth-child(3)`, {origin:'right'})
sr.reveal(`.depoimento__container`, {origin:'bottom'})
