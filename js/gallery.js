// Gallery page - Series photo grid with pagination

const PHOTOS_PER_PAGE = 8;
let currentPage = 1;
let totalPhotos = [];

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        photographer: params.get('photographer'),
        series: parseInt(params.get('series'))
    };
}

function renderGallery() {
    const { photographer: photographerKey, series: seriesIndex } = getUrlParams();

    if (!photographerKey || isNaN(seriesIndex)) {
        document.getElementById('photo-grid').innerHTML = '<p style="text-align: center; color: #666;">Invalid parameters</p>';
        return;
    }

    const photographer = PHOTOGRAPHERS_DATA[photographerKey];
    if (!photographer || !photographer.series[seriesIndex]) {
        document.getElementById('photo-grid').innerHTML = '<p style="text-align: center; color: #666;">Series not found</p>';
        return;
    }

    const series = photographer.series[seriesIndex];
    totalPhotos = series.photos;

    // Update page title only
    document.title = `${series.title} - ${photographer.name} - Magnum Index`;

    // Render current page
    renderCurrentPage();
    renderPagination();
}

function renderCurrentPage() {
    const gridContainer = document.getElementById('photo-grid');
    gridContainer.innerHTML = '';

    const startIndex = (currentPage - 1) * PHOTOS_PER_PAGE;
    const endIndex = startIndex + PHOTOS_PER_PAGE;
    const photosToShow = totalPhotos.slice(startIndex, endIndex);

    photosToShow.forEach(photo => {
        const item = document.createElement('div');
        item.className = 'grid-item';
        item.setAttribute('data-title', photo.title);

        const img = document.createElement('img');
        img.src = photo.imageUrl;
        img.alt = photo.title;
        img.loading = 'lazy';

        item.appendChild(img);
        item.addEventListener('click', () => {
            window.open(photo.detailUrl, '_blank');
        });

        gridContainer.appendChild(item);
    });

    // Scroll to top of gallery
    window.scrollTo(0, 0);
}

function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(totalPhotos.length / PHOTOS_PER_PAGE);

    if (totalPages <= 1) {
        return;
    }

    // Previous button: <<
    const prevBtn = document.createElement('a');
    prevBtn.className = 'page-btn';
    prevBtn.textContent = '<<';
    prevBtn.href = '#';
    if (currentPage === 1) {
        prevBtn.style.opacity = '0.3';
        prevBtn.style.cursor = 'default';
    } else {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage--;
            renderCurrentPage();
            renderPagination();
        });
    }
    paginationContainer.appendChild(prevBtn);

    // Separator
    const sep1 = document.createElement('span');
    sep1.className = 'page-separator';
    sep1.textContent = '|';
    paginationContainer.appendChild(sep1);

    // Page numbers with separators
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('a');
        pageBtn.className = 'page-btn';
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        pageBtn.textContent = i;
        pageBtn.href = '#';
        pageBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            renderCurrentPage();
            renderPagination();
        });
        paginationContainer.appendChild(pageBtn);

        // Add separator after each number except the last one
        if (i < totalPages) {
            const sep = document.createElement('span');
            sep.className = 'page-separator';
            sep.textContent = '|';
            paginationContainer.appendChild(sep);
        }
    }

    // Separator before next button
    const sep2 = document.createElement('span');
    sep2.className = 'page-separator';
    sep2.textContent = '|';
    paginationContainer.appendChild(sep2);

    // Next button: >>
    const nextBtn = document.createElement('a');
    nextBtn.className = 'page-btn';
    nextBtn.textContent = '>>';
    nextBtn.href = '#';
    if (currentPage === totalPages) {
        nextBtn.style.opacity = '0.3';
        nextBtn.style.cursor = 'default';
    } else {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage++;
            renderCurrentPage();
            renderPagination();
        });
    }
    paginationContainer.appendChild(nextBtn);
}

// Initialize
document.addEventListener('DOMContentLoaded', renderGallery);
