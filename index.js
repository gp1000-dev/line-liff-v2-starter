import './index.css';
import liff from '@line/liff'

document.addEventListener("DOMContentLoaded", function() {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
        console.log("Success! you can do something with LIFF API here.");
        document.getElementById('text').innerHTML = 'Success! you can do something with LIFF API here.';

        const contact_name = 'test';
        const email = 'test2';
        const body = 'test3';

        const api_url = "https://script.google.com/macros/s/AKfycbytDrJaBIwmuuutJYf37k5h18fROp9dyvF8hU2stJs3bP-oxgzr64MDXAFSJSYU7ywdvA/exec";
        fetch(api_url, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: encodeURI(`name=${contact_name}&email=${email}&body=${body}`),
        })
            .then((response) => {
                if (response.ok) console.log('okです！'); 
                response.text().then((text) => {
                    console.log(response);
                    console.log(text);
                    alert(text);
                });
            })
            .catch((error) => {
                alert(error.message);
            });
        
        })
        .catch((error) => {
            console.log(error)
        })
});
