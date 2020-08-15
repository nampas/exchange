const createExchange = () => {
  var exchangeId = window.location.pathname.split('/').pop();
  var opts = {
    method: 'PUT',
    body: JSON.stringify({ message: getText() }),
    headers: { 'Content-Type': 'application/json' },
  };
  fetch('/ex/' + exchangeId, opts).then((res) => {
    if (res.status == 200) {
      location.reload();
    } else {
      console.log('oops', res);
    }
  });
};

const getText = () => {
  return document.getElementById('message').value;
};

window.addEventListener('load', () => {
  document.getElementById('submit').addEventListener('click', createExchange);
});
