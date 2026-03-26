// Magnum Index - Random Photo Display (refresh to change)

let currentPhoto = null;

function getRandomPhoto() {
    const allPhotos = [];

    Object.keys(PHOTOGRAPHERS_DATA).forEach(key => {
        const photographer = PHOTOGRAPHERS_DATA[key];
        photographer.series.forEach(series => {
            series.photos.forEach(photo => {
                allPhotos.push({
                    ...photo,
                    photographerName: photographer.name,
                    photographerSlug: key,
                    photographerUrl: photographer.magnumUrl,
                    seriesTitle: series.title,
                    seriesUrl: series.url
                });
            });
        });
    });

    const randomIndex = Math.floor(Math.random() * allPhotos.length);
    return allPhotos[randomIndex];
}

function displayRandomPhoto() {
    currentPhoto = getRandomPhoto();

    // Update image
    const imgEl = document.getElementById('random-photo');
    imgEl.src = currentPhoto.imageUrl;
    imgEl.alt = currentPhoto.title;

    // Update series name (clickable)
    const seriesEl = document.getElementById('series-name');
    seriesEl.innerHTML = `<a href="${currentPhoto.seriesUrl}" target="_blank">${currentPhoto.seriesTitle}</a> · `;

    // Update photo title (clickable)
    const titleEl = document.getElementById('photo-title');
    titleEl.innerHTML = `<a href="${currentPhoto.detailUrl}" target="_blank">${currentPhoto.title}</a>`;

    // Update photographer link
    const photographerEl = document.getElementById('photographer-link');
    photographerEl.textContent = currentPhoto.photographerName;
    photographerEl.href = currentPhoto.photographerUrl;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    displayRandomPhoto();

    // Add click handler to photo frame
    const photoFrame = document.getElementById('photo-frame');
    photoFrame.addEventListener('click', () => {
        if (currentPhoto && currentPhoto.detailUrl) {
            window.open(currentPhoto.detailUrl, '_blank');
        }
    });
});
