// Archive page - Tree list renderer

function renderArchive() {
    const treeContainer = document.getElementById('archive-tree');

    // Sort photographers by name
    const sortedKeys = Object.keys(PHOTOGRAPHERS_DATA).sort((a, b) => {
        return PHOTOGRAPHERS_DATA[a].name.localeCompare(PHOTOGRAPHERS_DATA[b].name);
    });

    sortedKeys.forEach(key => {
        const photographer = PHOTOGRAPHERS_DATA[key];

        // Create photographer item
        const photographerLi = document.createElement('li');
        photographerLi.className = 'tree-item tree-item-photographer';

        const photographerSpan = document.createElement('span');
        photographerSpan.className = 'tree-photographer';
        photographerSpan.textContent = photographer.name;

        photographerLi.appendChild(photographerSpan);

        // Create series list
        const seriesUl = document.createElement('ul');

        photographer.series.forEach((series, index) => {
            const seriesLi = document.createElement('li');
            seriesLi.className = 'tree-item tree-item-series';

            const seriesLink = document.createElement('a');
            seriesLink.className = 'tree-series-link';
            seriesLink.href = `gallery.html?photographer=${key}&series=${index}`;
            seriesLink.textContent = series.title;

            const photoCount = document.createElement('span');
            photoCount.className = 'tree-photo-count';
            photoCount.textContent = `[${series.photos.length}]`;

            seriesLink.appendChild(photoCount);
            seriesLi.appendChild(seriesLink);
            seriesUl.appendChild(seriesLi);
        });

        photographerLi.appendChild(seriesUl);
        treeContainer.appendChild(photographerLi);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', renderArchive);
