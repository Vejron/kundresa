export default () => {
  window.$crisp = [];
  window.CRISP_WEBSITE_ID = "ac52e283-284a-4767-b382-599c2c58e5eb";

  (function() {
    var d = document;
    var s = d.createElement("script");

    s.src = "https://client.crisp.chat/l.js";
    s.async = 1;
    d.getElementsByTagName("head")[0].appendChild(s);
  })();
};

