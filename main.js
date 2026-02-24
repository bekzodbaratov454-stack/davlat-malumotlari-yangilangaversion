function getCountry() {
    const countryName = document.getElementById("countryInput").value;
    const result = document.getElementById("result");

    result.innerHTML = "Downloading...";

    fetch(`https://restcountries.com/v3.1/name/${countryName}`, {
        method: "GET"
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Davlat topilmadi");
            }
            return res.json();
        })
        .then((data) => {
            const country = data[0];

            const flag = country.flags?.png || "https://via.placeholder.com/150?text=No+Flag";

            let currency = "Ma'lumot yo'q 😐";
            if (country.currencies) {
                const current = Object.values(country.currencies)[0];
                currency = `${current.name} (${current.symbol || ""})`;
            }

            result.innerHTML = `
            <h2>${country.name.common}</h2>
            <img src="${flag}" width="150" alt="Flag of ${country.name.common}">
            <p><b>Poytaxt:</b> ${country.capital?.[0] || "Ma'lumot yo'q"}</p>
            <p><b>Aholi:</b> ${country.population.toLocaleString()}</p>
            <p><b>Hudud:</b> ${country.region}</p>
            <p><b>Valyutasi:</b> ${currency}</p>
            <p><b>Chegaradosh:</b> ${country.borders ? country.borders.join(", ") : "Yo'q"}</p>

        `;
        })
        .catch((err) => {
            result.innerHTML = `<p style="color:red">${err.message}</p>`;
        });
}
const html = document.documentElement;


const themeBtn = document.querySelector(".tun_kun button");

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);


themeBtn.addEventListener('click', () => {
    let current = html.getAttribute('data-theme');
    let next = current === 'dark' ? 'light' : 'dark';

    html.setAttribute("data-theme", next);
    localStorage.setItem('theme', next);

    themeBtn.innerHTML = next === 'dark'
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

});

const select = document.getElementById("colors");

select.addEventListener("change", () => {
    const region = select.value;
    const result = document.getElementById("result");

    document.getElementById("countryInput").value = "";

    result.innerHTML = "Yuklanmoqda...";

    fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(res => res.json())
        .then(data => {
            result.innerHTML = "";

            data.forEach(country => {
                const flag = country.flags?.png || "";
                const currency = country.currencies
                    ? `${Object.values(country.currencies)[0].name} (${Object.values(country.currencies)[0].symbol || ""})`
                    : "Ma'lumot yo'q";

                const card = document.createElement("div");
                card.className = "result-card";

                card.innerHTML = `
                    <img src="${flag}" alt="Flag of ${country.name.common}">
                    <h2>${country.name.common}</h2>
                    <p><b>Poytaxt:</b> ${country.capital?.[0] || "Yo‘q"}</p>
                    <p><b>Aholi:</b> ${country.population.toLocaleString()}</p>
                    <p><b>Hudud:</b> ${country.region}</p>
                    <p><b>Valyutasi:</b> ${currency}</p>
                    <p><b>Chegaradosh:</b> ${country.borders ? country.borders.join(", ") : "Yo'q"}</p>
                `;

                result.appendChild(card);
            });
        })
        .catch(() => {
            result.innerHTML = "<p>Xatolik yuz berdi</p>";
        });
});