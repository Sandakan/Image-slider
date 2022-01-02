const slidesContainer = document.querySelector('.slider-container .slides-container');
const dotsContainer = document.querySelector('.slider-container .dots-container');
const prevBtn = document.querySelector('.slider-container .prev-btn');
const nextBtn = document.querySelector('.slider-container .next-btn');
let currentSlide = 0;

const images = [
	{ src: 'https://rb.gy/ohx0bd' },
	{ src: 'https://rb.gy/gggxy8' },
	{ src: 'https://rb.gy/z2a0fy' },
	{ src: 'https://rb.gy/nsefjh' },
	{ src: 'https://rb.gy/dssu2a' },
];

const changeCurrentSlideNumber = (isForward, isStartup = false, forcedSlideNumber = null) => {
	if (isStartup) changeCurrentSlide();
	else if (
		forcedSlideNumber !== null &&
		forcedSlideNumber >= 0 &&
		forcedSlideNumber < images.length
	) {
		currentSlide = forcedSlideNumber;
		changeCurrentSlide();
	} else {
		if (isForward) {
			if (currentSlide === images.length - 1) {
				currentSlide = 0;
			} else {
				currentSlide++;
			}
		} else {
			if (currentSlide === 0) {
				currentSlide = images.length - 1;
			} else {
				currentSlide--;
			}
		}
	}
	changeCurrentSlide();
};

const changeCurrentSlide = () => {
	const dots = document.querySelectorAll('.dots-container .dot');
	const slides = document.querySelectorAll('.slides-container img');

	slides.forEach((x) => {
		x.classList.remove('active');
	});
	slides[currentSlide].classList.add('active');
	dots.forEach((y) => {
		y.classList.remove('active');
	});
	dots[currentSlide].classList.add('active');
};

images.forEach((x, id) => {
	if (id === currentSlide)
		slidesContainer.innerHTML = `<img class="active" src="${x.src}" alt="Photo ${id}" data-img-id="${id}" />`;
	else slidesContainer.innerHTML += `<img src="${x.src}" alt="Photo ${id}" data-img-id="${id}" />`;
	dotsContainer.innerHTML += `<span class="dot" data-img-id="${id}"></span>`;
});

const dots = document.querySelectorAll('.dots-container .dot');

dots.forEach((x) => {
	x.addEventListener('click', (e) =>
		changeCurrentSlideNumber(null, false, Number(e.target.dataset.imgId))
	);
});
prevBtn.addEventListener('click', () => changeCurrentSlideNumber(false));
nextBtn.addEventListener('click', () => changeCurrentSlideNumber(true));

changeCurrentSlideNumber(null, true);

setInterval(() => changeCurrentSlideNumber(true, false, null), 4000);
