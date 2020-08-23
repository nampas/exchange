const submitMessage = (e) => {
  e.preventDefault();
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

const copyFrom = (textArea) => {
  textArea.focus();
  textArea.select();
  var successful = document.execCommand('copy');
  console.log(successful);
};

const getText = () => {
  return document.getElementById('message').value;
};

const ifElementExists = (element, fn) => {
  var el = document.getElementById(element);
  if (el) {
    fn(el);
  }
  return el;
};

window.addEventListener('load', () => {
  var href = window.location.href;

  var urlText = ifElementExists('urlText', (el) => (el.value = href));
  ifElementExists('submit', (el) =>
    el.addEventListener('click', submitMessage)
  );
  ifElementExists('copyUrl', (el) =>
    el.addEventListener('click', () => copyFrom(urlText))
  );
  ifElementExists('sendEmail', (el) => {
    el.href =
      'mailto:abc@example.com?subject=Answer this exchange!&body=' + href;
  });
});
