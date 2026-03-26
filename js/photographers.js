// Photographers list page

function renderPhotographers() {
    const container = document.querySelector('.photographers-list');

    Object.keys(PHOTOGRAPHERS_DATA).forEach(key => {
        const photographer = PHOTOGRAPHERS_DATA[key];
        const card = createPhotographerCard(key, photographer);
        container.appendChild(card);
    });
}

function createPhotographerCard(slug, photographer) {
    const card = document.createElement('div');
    card.className = 'photographer-card';

    // Header
    const header = document.createElement('div');
    header.className = 'photographer-header';

    const name = document.createElement('h2');
    name.className = 'photographer-name';
    name.textContent = photographer.name;

    const source = document.createElement('div');
    source.className = `photographer-source ${photographer.source}`;
    source.textContent = photographer.source;

    header.appendChild(name);
    header.appendChild(source);
    card.appendChild(header);

    // Series list
    const seriesList = document.createElement('div');
    seriesList.className = 'series-list';

    photographer.series.forEach(series => {
        const seriesItem = document.createElement('div');
        seriesItem.className = 'series-item';

        const seriesTitle = document.createElement('h3');
        seriesTitle.className = 'series-title';
        seriesTitle.innerHTML = `<a href="${series.url}" target="_blank">${series.title}</a>`;
        seriesItem.appendChild(seriesTitle);

        // Gallery grid
        const grid = document.createElement('div');
        grid.className = 'gallery-grid';

        series.photos.forEach(photo => {
            const item = document.createElement('div');
            item.className = 'gallery-item';

            const img = document.createElement('img');
            img.src = photo.imageUrl;
            img.alt = photo.title;
            img.loading = 'lazy';

            item.appendChild(img);
            item.addEventListener('click', () => {
                window.open(photo.detailUrl, '_blank');
            });

            grid.appendChild(item);
        });

        seriesItem.appendChild(grid);
        seriesList.appendChild(seriesItem);
    });

    card.appendChild(seriesList);
    return card;
}

// Initialize
document.addEventListener('DOMContentLoaded', renderPhotographers);
