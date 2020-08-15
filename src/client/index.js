const createExchange = () => {
  fetch('/exchange', { method: 'POST' }).then((res) => {
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
