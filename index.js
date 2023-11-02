import './index.css';
import liff from '@line/liff'

document.addEventListener("DOMContentLoaded", function() {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
      const api_url = `https://script.google.com/macros/s/${process.env.DEP_ID}/exec`;

      // スプレッドシートのシート１の情報全取得
      fetch(api_url)
        .then((response) => {
          if (response.ok) {
            return response.json(); // JSONデータをパースして返す
          } else {
            throw new Error('APIからエラーレスポンスを受け取りました。');
          }
        })
        .then((data) => {
          const table = document.getElementById('table');
          // データ行を作成
          data.data.forEach((item, index) => {
            const dataRow = table.insertRow(index + 1);
            for (const key in item) {
              const dataCell = dataRow.insertCell();
              dataCell.textContent = item[key];
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });


        // フォームからの送信でスプレッドシートに店員追加
        const name = document.getElementById('name');
        const store = document.getElementById('store');
        document.getElementById('btn').addEventListener('click', function (e) {
          e.preventDefault();
          fetch(api_url, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: encodeURI(`name=${name.value}&store=${store.value}`),
            })
            .then((response) => {
              if (response.ok) {
                return response.json(); // JSONデータをパースして返す
              } else {
                throw new Error('APIからエラーレスポンスを受け取りました。');
              }
            })
            
            .then((data) => {
              alert(data.message);
            })
            .catch((error) => {
                alert(error.message);
            });
        })
        
    })
    .catch((error) => {
        console.log(error)
    }
    )
});
