

const buttons = document.getElementsByClassName('main_btn');

let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = () => {
    let newProduct = getNewProduct(i);
    console.log(i);
    let basket = JSON.parse(localStorage.getItem('basket'));

    if (!basket) {
      basket = [];
    }
    if (basket) {
      if (basket.every(product => product !== newProduct)) {
        basket.push(newProduct);
      }
    }

    localStorage.setItem('basket', JSON.stringify(basket));
  };
};

const getNewProduct = (index) => {
  switch (index) {
    case 0:
      return { name: 'Тройной гамбургер', cost: 450, src: 'images/dish-1.png', count: 1 };
    case 1:
      return { name: 'Нагетсы', cost: 450, src: 'images/dish-2.png', count: 1 };
    case 2:
      return { name: 'Курица на гриле', cost: 450, src: 'images/dish-3.png', count: 1 };
    case 3:
      return { name: 'Пицца Маргарита', cost: 450, src: 'images/dish-4.png', count: 1 };
    case 4:
      return { name: 'Шоколадное пироженое', cost: 450, src: 'images/dish-5.png', count: 1 };
    case 5:
      return { name: 'Куриные крылья в панировке', cost: 450, src: 'images/dish-6.png', count: 1 };
    case 6:
      return { name: 'пицца охотничья', cost: 450, src: 'images/menu-1.jpg', count: 1 };
    case 7:
      return { name: 'Куриные крылья в панировке', cost: 450, src: 'images/menu-2.jpg', count: 1 };
    case 8:
      return { name: 'Куриные крылья в панировке', cost: 450, src: 'images/menu-3.jpg', count: 1 };
    case 9:
      return { name: 'Куриные крылья в панировке', cost: 450, src: 'images/menu-4.jpg', count: 1 };
    case 10:
      return { name: 'Куриные крылья в панировке', cost: 450, src: 'images/menu-5.jpg', count: 1 };
    case 11:
      return { name: 'Куриные крылья в панировке', cost: 450, src: 'images/menu-6.jpg', count: 1 };
    case 12:
      return { name: 'Куриные крылья в панировке', cost: 450, src: 'images/menu-7.jpg', count: 1 };
    case 13:
      return { name: 'Куриные крылья в панировке', cost: 450, src: 'images/menu-8.jpg', count: 1 };
    case 14:
      return { name: 'Куриные крылья в панировке', cost: 450, src: 'images/menu-9.jpg', count: 1 };
    default:
      throw new Error('Error in add product');
  };
};

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () => {

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  section.forEach(sec => {

    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header .navbar a[href*=' + id + ']').classList.add('active');
      });
    };

  });

}

document.querySelector('#search-icon').onclick = () => {
  document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () => {
  document.querySelector('#search-form').classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
});

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  loop: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

function loader() {
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut() {
  setInterval(loader, 3000);
}

window.onload = fadeOut;