
console.log("this is currnet js")
const result = document.getElementById('result');

const search_input = document.getElementById('search');

let search_term = '';

search_input.addEventListener('input',(e)=>{
    // console.log(e);
    search_term = e.target.value;
    console.log(search_term)

    showCountries();
})

let countries;

const fetchcountries = async ()=>{
    countries = await fetch(
        'https://restcountries.com/v3.1/all?fields=name,capital,currencies,population,flags'
        )
        .then(res=>res.json())
    // console.log(countries)
};

const showCountries = async () => {
    
    result.innerHTML = ''
    //get data
    await fetchcountries();

    const ul = document.createElement('ul');
    ul.classList.add('countries');

    countries.filter(country=>country.name.common.toLowerCase().includes(search_term.toLowerCase())
    )
    .forEach(country => {
        const li = document.createElement('li');
        li.classList.add('country-item');

        const country_flag = document.createElement('img');
        // Setting the image source
        country_flag.src = country.flags.png;
        // country_flag.style = 'height:100px; width:150px; border:1px solid #ddd;'
        country_flag.classList.add('country-flag');

        // name
        const country_name = document.createElement('h3');
        country_name.innerText = `${country.name.common}`;
        country_name.classList.add('country-name');

        // country-info
        const country_info = document.createElement('div');
        country_info.classList.add('country-info');

        
        // country-population
        const country_population = document.createElement('h4');
        country_population.innerText = `Population: ${numberWithCommas(country.population)}`;
        country_population.classList.add('country-population');
        
        country_info.appendChild(country_population);
        
        li.appendChild(country_flag);
        li.appendChild(country_name);
        li.appendChild(country_info);
        
        // country-currency
        const currency = country.currencies[Object.keys(country.currencies)[0]];
        if(currency && currency.name){
            // console.log(currency.name)
    
            const country_info1 = document.createElement('div');
            country_info1.classList.add('country-info1');
    
            const country_currency = document.createElement('h4');
            country_currency.innerHTML = `Currency:  ${currency.symbol}, ${currency.name}`;
            country_currency.classList.add('country-currency');
            country_info1.appendChild(country_currency);
            li.appendChild(country_info1);
        }
        ul.appendChild(li);
    });
    
    result.appendChild(ul);
}

// showCountries();

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}



