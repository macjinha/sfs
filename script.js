document.addEventListener("DOMContentLoaded", function() {
    const jsonPath = 'data.json';
    console.log('Загружаем данные из:', jsonPath);

    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Не удалось загрузить JSON файл');
            }
            return response.json();
        })
        .then(data => {
            console.log('Данные получены:', data);
            document.title = data.company.brand;
            document.querySelectorAll('.company-brand').forEach(el => el.textContent = data.company.brand);
            document.querySelectorAll('.company-ul').forEach(el => el.textContent = data.company.ul);
            document.querySelectorAll('.city').forEach(el => el.textContent = data.company.city);
            document.querySelectorAll('.inn').forEach(el => el.textContent = data.company.inn);
            document.querySelectorAll('.ogrn').forEach(el => el.textContent = data.company.ogrn);
            document.querySelectorAll('.phone').forEach(el => {
                el.textContent = data.company.phone;
                el.setAttribute('href', `tel:${data.company.phone}`);
            });
            document.querySelectorAll('.email').forEach(el => {
                el.textContent = data.company.email;
                el.setAttribute('href', `mailto:${data.company.email}`);
            });
            const table = document.querySelector('.table');
            if (table) {
                table.innerHTML = '';
                data.objects.forEach(object => {
                    const row = table.insertRow();
                    row.innerHTML = `
                        <td>${object.address}</td>
                        <td>${object.phone}</td>
                        <td><a class="object-call button" href="tel:${object.phone}">Позвонить</a></td>
                    `;
                });
            }
            const priceListElement = document.getElementById('price-list');
            if (priceListElement && data.priceList) {
                priceListElement.setAttribute('href', data.priceList);
            }
            const yearElement = document.getElementById('year');
            if (yearElement) {
                yearElement.textContent = new Date().getFullYear();
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки данных:', error);
            alert('Не удалось загрузить данные. Попробуйте позже.');
        });
});
