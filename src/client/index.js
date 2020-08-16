const createExchange = () => {
  var prompt = document.getElementById('prompt').value;
  var opts = {
    method: 'POST',
    body: JSON.stringify({ prompt }),
    headers: { 'Content-Type': 'application/json' },
  };

  fetch('/ex', opts).then((res) => {
    if (res.status == 200) {
      res.json().then(({ url }) => (window.location = url));
    } else {
      console.log('oops', res);
    }
  });
};

window.addEventListener('load', () => {
  document.getElementById('create').addEventListener('click', createExchange);
});
