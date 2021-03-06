// get all currencies available
fetch('https://free.currencyconverterapi.com/api/v5/currencies')
    .then(response=> {
       return response.json();
    }).then(data =>{
    // console.log(Object.entries(data.results));
    const currencyArray = Object.entries(data.results);
    let testmap = new Map();
    for(const currency of currencyArray){
     //   console.log(currency);
        let currencyName = currency[1].currencyName;
       // let currencySymbole = currency[1].currencySymboll
        let currencyId = currency[1].id;

        testmap.set(currency[1].id, currency[1].currencyName);
    }
    return testmap;
        
    })
    .then(currencyMap =>{
        select_orig_currency = document.getElementById('from_currency');
        select_to_currency = document.getElementById('to_currency');
        for (const curr of currencyMap) {
            let[id, name] = curr;
           select_orig_currency.add(new Option(name, id));
           select_to_currency.add(new Option(name, id)); 
        }
    })
    .catch(err => {
        console.log("There was an error .", err);
    })
const form_element = document.getElementById('currency-form');
form_element.addEventListener('submit', event => {
  event.preventDefault();
  let fromField = document.getElementById('from_currency').value;
  let toField = document.getElementById('to_currency').value;
//   let amountField = document.getElementById('from_amount').value;
   urlQuery =  'https://free.currencyconverterapi.com/api/v5/convert?q='
   queryString = urlQuery+fromField+'_'+toField;
 
   fetch(queryString)
    .then(response =>{
        return response.json();
    }).then(data => {
        // console.log(data);
        const qResults = Object.entries(data.results);
        //  console.log(qResults);
        // console.log(qResults[0][1].val);
        let rate = qResults[0][1].val;
        return rate;
        
    }).then(rate => {
        let amountField = document.getElementById('from_amount').value;
        let convertedValue = rate * amountField;
        document.getElementById('to_amount').value = convertedValue;
    })
});